import assert from 'node:assert/strict';
import { createServer as httpsServer } from 'node:https';
import { createServer as tcpServer,connect } from 'node:net';
import { readFile,mkdtemp,rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { randomUUID } from 'node:crypto';
import { createTelegramOutbox } from './telegram-outbox';
import { sendTelegram } from '../lib/telegram-node';
import type { NotificationLead } from '../lib/telegram-message';
const key=await readFile(process.env.TEST_TLS_KEY!),cert=await readFile(process.env.NODE_EXTRA_CA_CERTS!);
let requests=0,fail=false;const destinations:string[]=[];let lastBody:Record<string,unknown>={};
const upstream=httpsServer({key,cert},async(req,res)=>{let data='';for await(const chunk of req)data+=chunk;lastBody=JSON.parse(data);requests++;assert.match(req.url||'',/^\/bot123456:TEST_ONLY_FAKE_BOT_TOKEN\/sendMessage$/);assert.equal(lastBody.chat_id,'-100000000001');res.setHeader('Content-Type','application/json');res.end(JSON.stringify(fail?{ok:false,description:'fixture failure'}:{ok:true,result:{message_id:777}}));});
await new Promise<void>(r=>upstream.listen(0,'127.0.0.1',r));const targetPort=(upstream.address() as {port:number}).port;
const sockets=new Set<import('node:net').Socket>();
const proxy=tcpServer(socket=>{sockets.add(socket);socket.on('close',()=>sockets.delete(socket));let state=0,buffer=Buffer.alloc(0);const consume=(chunk:Buffer)=>{buffer=Buffer.concat([buffer,chunk]);while(true){
 if(state===0){if(buffer.length<2||buffer.length<2+buffer[1])return;assert.equal(buffer[0],5);buffer=buffer.subarray(2+buffer[1]);socket.write(Buffer.from([5,2]));state=1;continue;}
 if(state===1){if(buffer.length<2)return;const ulen=buffer[1];if(buffer.length<3+ulen)return;const plen=buffer[2+ulen];if(buffer.length<3+ulen+plen)return;assert.equal(buffer.subarray(2,2+ulen).toString(),'agent@example.test');assert.equal(buffer.subarray(3+ulen,3+ulen+plen).toString(),'p@ss:test');buffer=buffer.subarray(3+ulen+plen);socket.write(Buffer.from([1,0]));state=2;continue;}
 if(state===2){if(buffer.length<5)return;assert.equal(buffer[3],3,'hostname is sent to SOCKS server; no local DNS resolution');const len=buffer[4];if(buffer.length<7+len)return;const host=buffer.subarray(5,5+len).toString();assert.equal(host,'api.telegram.org');assert.equal(buffer.readUInt16BE(5+len),443);destinations.push(host);const rest=buffer.subarray(7+len);socket.removeListener('data',consume);const remote=connect(targetPort,'127.0.0.1',()=>{socket.write(Buffer.from([5,0,0,1,127,0,0,1,0,0]));if(rest.length)remote.write(rest);socket.pipe(remote);remote.pipe(socket);});remote.on('error',()=>socket.destroy());socket.on('error',()=>remote.destroy());socket.on('close',()=>remote.destroy());return;}
 }};socket.on('data',consume);socket.on('error',()=>{});});
await new Promise<void>(r=>proxy.listen(0,'127.0.0.1',r));const proxyPort=(proxy.address() as {port:number}).port;
const config={token:'123456:TEST_ONLY_FAKE_BOT_TOKEN',chatId:'-100000000001',proxyUrl:`socks5h://agent%40example.test:p%40ss%3Atest@127.0.0.1:${proxyPort}`};
const directory=await mkdtemp(join(tmpdir(),'klever-socks-test-'));
const lead:NotificationLead={id:randomUUID(),createdAt:Date.now(),name:'',contact:'@contact_test',channel:'Telegram',service:'Alipay',details:'50000 RUB → CNY',consent:true,consentVersion:'2026-11-03',website:'',attribution:{utm_source:'yandex'}};
try{const file=join(directory,'delivery.ndjson');const deliver=createTelegramOutbox(file);const result=await Promise.all([deliver(lead,config),deliver(lead,config)]);assert.equal(result[0].status,'sent');assert.equal(result[1].messageId,'777');assert.equal(requests,1);assert.match(String(lastBody.text),/@contact_test/);assert.match(String(lastBody.text),/50000 RUB/);assert.match(String(lastBody.text),/utm_source: yandex/);assert.equal(lastBody.protect_content,true);
 const restart=createTelegramOutbox(file);assert.equal((await restart(lead,config)).status,'sent');assert.equal(requests,1,'delivered lead is not sent again after reopening the outbox');
 await assert.rejects(sendTelegram({...lead,id:randomUUID()},{...config,proxyUrl:'socks5://127.0.0.1:'+proxyPort}),/proxy_invalid/);assert.equal(requests,1,'there is no direct Telegram fallback');
 fail=true;const retryLead={...lead,id:randomUUID()};assert.equal((await deliver(retryLead,config)).status,'pending');fail=false;assert.equal((await deliver(retryLead,config)).status,'sent');assert.equal(requests,3);assert.ok(destinations.every(h=>h==='api.telegram.org'));

}finally{for(const socket of sockets)socket.destroy();upstream.closeAllConnections();await new Promise<void>(r=>proxy.close(()=>r()));await new Promise<void>(r=>upstream.close(()=>r()));await rm(directory,{recursive:true,force:true});}

console.log('SOCKS5h checks passed: proxy auth, remote DNS, verified TLS, Telegram payload, durable deduplication and retry without direct fallback.');

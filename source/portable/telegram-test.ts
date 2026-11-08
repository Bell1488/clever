import assert from 'node:assert/strict';
import { createServer as httpsServer } from 'node:https';
import { createServer as tcpServer,connect } from 'node:net';
import { readFile,mkdtemp,rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { randomUUID } from 'node:crypto';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { createTelegramOutbox } from './telegram-outbox';
import { sendTelegram,checkTelegram,TelegramDeliveryError } from '../lib/telegram-node';
import type { NotificationLead } from '../lib/telegram-message';
const key=await readFile(process.env.TEST_TLS_KEY!),cert=await readFile(process.env.NODE_EXTRA_CA_CERTS!);
let requests=0,fail=false,denied=false;const destinations:string[]=[],methods:string[]=[];let lastBody:Record<string,unknown>={};
const upstream=httpsServer({key,cert},async(req,res)=>{let data='';for await(const chunk of req)data+=chunk;lastBody=JSON.parse(data);requests++;assert.match(req.url||'',/^\/bot123456:TEST_ONLY_FAKE_BOT_TOKEN\/(sendMessage|getMe|getChat|getChatMember)$/);const method=req.url!.split('/').pop()!;methods.push(method);if(method!=='getMe')assert.equal(lastBody.chat_id,'-100000000001');const result=method==='getMe'?{id:123456,is_bot:true}:method==='getChat'?{id:-100000000001,type:'supergroup',permissions:{can_send_messages:true}}:method==='getChatMember'?{status:denied?'left':'member'}:{message_id:777};res.setHeader('Content-Type','application/json');res.end(JSON.stringify(fail?{ok:false,error_code:403,description:'fixture failure'}:{ok:true,result}));});
await new Promise<void>(r=>upstream.listen(0,'127.0.0.1',r));const targetPort=(upstream.address() as {port:number}).port;
const sockets=new Set<import('node:net').Socket>();
type ProxyFailure='auth'|'method'|'protocol'|number|null;
let proxyFailure:ProxyFailure=null;
const proxy=tcpServer(socket=>{sockets.add(socket);socket.on('close',()=>sockets.delete(socket));let state=0,buffer=Buffer.alloc(0);const consume=(chunk:Buffer)=>{buffer=Buffer.concat([buffer,chunk]);while(true){
 if(state===0){if(buffer.length<2||buffer.length<2+buffer[1])return;assert.equal(buffer[0],5);buffer=buffer.subarray(2+buffer[1]);if(proxyFailure==='method'||proxyFailure==='protocol'){socket.end(Buffer.from(proxyFailure==='method'?[5,255]:[72,84]));return}socket.write(Buffer.from([5,2]));state=1;continue;}
 if(state===1){if(buffer.length<2)return;const ulen=buffer[1];if(buffer.length<3+ulen)return;const plen=buffer[2+ulen];if(buffer.length<3+ulen+plen)return;assert.equal(buffer.subarray(2,2+ulen).toString(),'agent@example.test');assert.equal(buffer.subarray(3+ulen,3+ulen+plen).toString(),'p@ss:test');buffer=buffer.subarray(3+ulen+plen);if(proxyFailure==='auth'){socket.end(Buffer.from([1,1]));return}socket.write(Buffer.from([1,0]));state=2;continue;}
 if(state===2){if(buffer.length<5)return;assert.equal(buffer[3],3,'hostname is sent to SOCKS server; no local DNS resolution');const len=buffer[4];if(buffer.length<7+len)return;const host=buffer.subarray(5,5+len).toString();assert.equal(host,'api.telegram.org');assert.equal(buffer.readUInt16BE(5+len),443);destinations.push(host);if(typeof proxyFailure==='number'){socket.end(Buffer.from([5,proxyFailure,0,1,127,0,0,1,0,0]));return}const rest=buffer.subarray(7+len);socket.removeListener('data',consume);const remote=connect(targetPort,'127.0.0.1',()=>{socket.write(Buffer.from([5,0,0,1,127,0,0,1,0,0]));if(rest.length)remote.write(rest);socket.pipe(remote);remote.pipe(socket);});remote.on('error',()=>socket.destroy());socket.on('error',()=>remote.destroy());socket.on('close',()=>remote.destroy());return;}
 }};socket.on('data',consume);socket.on('error',()=>{});});
await new Promise<void>(r=>proxy.listen(0,'127.0.0.1',r));const proxyPort=(proxy.address() as {port:number}).port;
const config={token:'123456:TEST_ONLY_FAKE_BOT_TOKEN',chatId:'-100000000001',proxyUrl:`socks5h://agent%40example.test:p%40ss%3Atest@127.0.0.1:${proxyPort}`};
const directory=await mkdtemp(join(tmpdir(),'klever-socks-test-'));
const lead:NotificationLead={id:randomUUID(),createdAt:Date.now(),name:'',contact:'@contact_test',channel:'Telegram',service:'Alipay',details:'50000 RUB → CNY',consent:true,consentVersion:'2026-11-03',website:'',attribution:{utm_source:'yandex'}};
let server:ReturnType<typeof spawn>|undefined;
const serverFile=fileURLToPath(new URL('./server.mjs',import.meta.url));
const fixtureEnv={...process.env,TELEGRAM_BOT_TOKEN:config.token,TELEGRAM_CHAT_ID:config.chatId,TELEGRAM_PROXY_URL:config.proxyUrl,DATA_DIR:directory,NO_PROXY:'*',no_proxy:'*',HOST:'127.0.0.1',PORT:'0'};
async function checkCli(env:NodeJS.ProcessEnv){const child=spawn(process.execPath,[serverFile,'--check-telegram'],{env,stdio:['ignore','pipe','pipe']});let output='';for(const stream of [child.stdout,child.stderr])stream!.on('data',chunk=>{output+=chunk});const code=await new Promise<number|null>((resolve,reject)=>{child.once('error',reject);child.once('close',resolve)});assert.ok(!output.includes(config.token)&&!output.includes(config.proxyUrl),'diagnostics do not print credentials');return {code,output}}
try{const file=join(directory,'delivery.ndjson');const deliver=createTelegramOutbox(file);const result=await Promise.all([deliver(lead,config),deliver(lead,config)]);assert.equal(result[0].status,'sent');assert.equal(result[1].messageId,'777');assert.equal(requests,1);assert.match(String(lastBody.text),/@contact_test/);assert.match(String(lastBody.text),/50000 RUB/);assert.match(String(lastBody.text),/utm_source: yandex/);assert.equal(lastBody.protect_content,true);
 const restart=createTelegramOutbox(file);assert.equal((await restart(lead,config)).status,'sent');assert.equal(requests,1,'delivered lead is not sent again after reopening the outbox');
 await assert.rejects(sendTelegram({...lead,id:randomUUID()},{...config,proxyUrl:'socks5://127.0.0.1:'+proxyPort}),/proxy_invalid/);assert.equal(requests,1,'there is no direct Telegram fallback');
 fail=true;const retryLead={...lead,id:randomUUID()};assert.equal((await deliver(retryLead,config)).status,'pending');fail=false;assert.equal((await deliver(retryLead,config)).status,'sent');assert.equal(requests,3);assert.ok(destinations.every(h=>h==='api.telegram.org'));
 await checkTelegram(config);assert.deepEqual(methods.slice(-3),['getMe','getChat','getChatMember']);assert.equal(methods.filter(method=>method==='sendMessage').length,3,'diagnostics never send messages');
 denied=true;await assert.rejects(checkTelegram(config),(error:unknown)=>error instanceof TelegramDeliveryError&&error.detail==='send_forbidden');denied=false;
 fail=true;await assert.rejects(sendTelegram({...lead,id:randomUUID()},config),(error:unknown)=>error instanceof TelegramDeliveryError&&error.code==='telegram_rejected'&&error.detail==='403');fail=false;
 const originalCa=process.env.CURL_CA_BUNDLE;process.env.CURL_CA_BUNDLE=join(directory,'missing-ca.pem');try{await assert.rejects(sendTelegram({...lead,id:randomUUID()},config),(error:unknown)=>error instanceof TelegramDeliveryError&&error.code==='network_error');}finally{if(originalCa===undefined)delete process.env.CURL_CA_BUNDLE;else process.env.CURL_CA_BUNDLE=originalCa}
 const cli=await checkCli(fixtureEnv);assert.equal(cli.code,0,cli.output);assert.match(cli.output,/Telegram OK/);
 const sendsBeforeErrors=methods.filter(method=>method==='sendMessage').length;
 for(const [failure,detail]of [['auth','auth_rejected'],['method','auth_method'],['protocol','protocol'],...[1,2,3,4,5,6,7,8].map(code=>[code,`reply_${code}`])] as const){proxyFailure=failure as ProxyFailure;const failed=await checkCli(fixtureEnv);assert.equal(failed.code,1);assert.ok(failed.output.includes(`detail=curl_97_${detail}`),failed.output);assert.ok(!failed.output.includes('agent@example.test')&&!failed.output.includes('p@ss:test'),'decoded proxy credentials are not logged')}
 proxyFailure=null;assert.equal(methods.filter(method=>method==='sendMessage').length,sendsBeforeErrors,'SOCKS failures never reach Telegram');
 const invalidCli=await checkCli({...fixtureEnv,TELEGRAM_PROXY_URL:'socks5://127.0.0.1:'+proxyPort});assert.equal(invalidCli.code,1);assert.match(invalidCli.output,/proxy_invalid/);
 const missingCli=await checkCli({...fixtureEnv,TELEGRAM_BOT_TOKEN:''});assert.equal(missingCli.code,1);assert.match(missingCli.output,/not_configured/);
 server=spawn(process.execPath,[serverFile],{env:fixtureEnv,stdio:['ignore','pipe','pipe']});
 let stderr='';server.stderr!.on('data',chunk=>{stderr+=chunk});
 const origin=await new Promise<string>((resolve,reject)=>{const timer=setTimeout(()=>{server!.kill();reject(new Error('server startup timeout: '+stderr))},5000);server!.once('error',error=>{clearTimeout(timer);reject(error)});server!.once('exit',()=>{clearTimeout(timer);reject(new Error('server exited: '+stderr))});let output='';server!.stdout!.on('data',chunk=>{output+=chunk;const match=output.match(/http:\/\/127\.0\.0\.1:(\d+)/);if(match){clearTimeout(timer);resolve(match[0])}})});
 const apiLead={...lead,requestId:randomUUID()};
 const post=()=>fetch(origin+'/api/requests',{method:'POST',headers:{'Content-Type':'application/json',Origin:origin},body:JSON.stringify(apiLead)});
 const before=methods.filter(method=>method==='sendMessage').length;
 const sent=await post();assert.equal(sent.status,201);assert.deepEqual(await sent.json(),{id:apiLead.requestId,delivery:'sent'});
 const repeated=await post();assert.equal(repeated.status,201);assert.equal(methods.filter(method=>method==='sendMessage').length,before+1,'API retries do not duplicate Telegram messages');
 const stored=(await readFile(join(directory,'requests.ndjson'),'utf8')).trim().split('\n').map(line=>JSON.parse(line));assert.equal(stored.at(-1).telegramMessageId,'777');
 assert.ok(destinations.every(h=>h==='api.telegram.org'));

}finally{if(server&&server.exitCode===null&&server.signalCode===null){await new Promise<void>(resolve=>{server!.once('exit',()=>resolve());server!.kill()})}for(const socket of sockets)socket.destroy();upstream.closeAllConnections();await new Promise<void>(r=>proxy.close(()=>r()));await new Promise<void>(r=>upstream.close(()=>r()));await rm(directory,{recursive:true,force:true});}

console.log('SOCKS5h checks passed: proxy auth, remote DNS, verified TLS and CA failures, Telegram errors, durable deduplication, retry and read-only bot diagnostics without direct fallback.');

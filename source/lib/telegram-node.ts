import { request } from 'node:https';
import { SocksProxyAgent } from 'socks-proxy-agent';
import { telegramMessage,type NotificationLead } from './telegram-message';
export type TelegramConfig={token?:string;chatId?:string;proxyUrl?:string};
export class TelegramDeliveryError extends Error{constructor(public code:'not_configured'|'proxy_invalid'|'upstream_failed'){super(code);this.name='TelegramDeliveryError'}}
export function telegramReady(config:TelegramConfig){return /^\d+:[A-Za-z0-9_-]+$/.test(config.token||'')&&/^-?\d+$/.test(config.chatId||'')&&validProxy(config.proxyUrl)}
export function validProxy(value?:string){try{const u=new URL(value||'');return u.protocol==='socks5h:'&&!!u.hostname&&Number(u.port)>0&&Number(u.port)<=65535}catch{return false}}
export async function sendTelegram(lead:NotificationLead,config:TelegramConfig):Promise<string>{
 if(!config.token||!config.chatId||!config.proxyUrl)throw new TelegramDeliveryError('not_configured');
 if(!validProxy(config.proxyUrl))throw new TelegramDeliveryError('proxy_invalid');
 if(!telegramReady(config))throw new TelegramDeliveryError('not_configured');
 const agent=new SocksProxyAgent(config.proxyUrl,{timeout:10000});
 const payload=JSON.stringify({chat_id:config.chatId,text:telegramMessage(lead),protect_content:true,link_preview_options:{is_disabled:true}});
 return await new Promise<string>((resolve,reject)=>{
  let settled=false;const finish=(error?:Error,id?:string)=>{if(settled)return;settled=true;clearTimeout(timer);agent.destroy();error?reject(error):resolve(id!)};
  const req=request({protocol:'https:',hostname:'api.telegram.org',port:443,path:`/bot${config.token}/sendMessage`,method:'POST',agent,headers:{'Content-Type':'application/json','Content-Length':Buffer.byteLength(payload)}},res=>{let text='';res.setEncoding('utf8');res.on('data',(chunk:string)=>{text+=chunk;if(text.length>64000)req.destroy()});res.on('end',()=>{try{const body=JSON.parse(text);if(res.statusCode===200&&body.ok===true&&Number.isInteger(body.result?.message_id))finish(undefined,String(body.result.message_id));else finish(new TelegramDeliveryError('upstream_failed'));}catch{finish(new TelegramDeliveryError('upstream_failed'));}});res.on('error',()=>finish(new TelegramDeliveryError('upstream_failed')));});
  const timer=setTimeout(()=>{req.destroy();finish(new TelegramDeliveryError('upstream_failed'))},12000);
  req.on('error',()=>finish(new TelegramDeliveryError('upstream_failed')));req.end(payload);
 });
}

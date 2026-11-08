import { spawn } from 'node:child_process';
import { telegramMessage,type NotificationLead } from './telegram-message';
export type TelegramConfig={token?:string;chatId?:string;proxyUrl?:string};
export class TelegramDeliveryError extends Error{constructor(public code:'not_configured'|'proxy_invalid'|'network_error'|'telegram_rejected'|'timeout'|'upstream_failed',public detail?:string){super(code);this.name='TelegramDeliveryError'}}
export function telegramReady(config:TelegramConfig){return /^\d+:[A-Za-z0-9_-]+$/.test(config.token||'')&&/^-?\d+$/.test(config.chatId||'')&&validProxy(config.proxyUrl)}
export function validProxy(value?:string){try{const u=new URL(value||'');return u.protocol==='socks5h:'&&!!u.hostname&&Number(u.port)>0&&Number(u.port)<=65535}catch{return false}}
function curlConfig(config:TelegramConfig,payload:string){const quote=(value:string)=>JSON.stringify(value);return [
 `url = ${quote(`https://api.telegram.org/bot${config.token}/sendMessage`)}`,
 `proxy = ${quote(config.proxyUrl!)}`,
 'noproxy = ""',
 'request = "POST"',
 'header = "Content-Type: application/json"',
 `data-binary = ${quote(payload)}`,
 'silent',
 'connect-timeout = 10',
 'max-time = 25',
 'proto = "=https"',
 'max-filesize = 65536',
 ''
].join('\n')}
export async function sendTelegram(lead:NotificationLead,config:TelegramConfig):Promise<string>{
 if(!config.token||!config.chatId||!config.proxyUrl)throw new TelegramDeliveryError('not_configured');
 if(!validProxy(config.proxyUrl))throw new TelegramDeliveryError('proxy_invalid');
 if(!telegramReady(config))throw new TelegramDeliveryError('not_configured');
 const payload=JSON.stringify({chat_id:config.chatId,text:telegramMessage(lead),protect_content:true,link_preview_options:{is_disabled:true}});
 return await new Promise<string>((resolve,reject)=>{
  let settled=false,output='';const finish=(error?:Error,id?:string)=>{if(settled)return;settled=true;clearTimeout(timer);error?reject(error):resolve(id!)};
  const child=spawn('curl',['--disable','--config','-'],{stdio:['pipe','pipe','ignore']});
  const timer=setTimeout(()=>{child.kill();finish(new TelegramDeliveryError('timeout'))},27000);
  child.stdout.setEncoding('utf8');child.stdout.on('data',(chunk:string)=>{output+=chunk;if(output.length>131072){child.kill();finish(new TelegramDeliveryError('upstream_failed'))}});
  child.on('error',(error:NodeJS.ErrnoException)=>{const code=typeof error.code==='string'&&/^[A-Z0-9_]{1,40}$/.test(error.code)?error.code:'curl_unavailable';finish(new TelegramDeliveryError('network_error',code))});
  child.on('close',(status:number|null)=>{if(settled)return;if(status!==0){finish(new TelegramDeliveryError(status===28?'timeout':'network_error',`curl_${status??'unknown'}`));return;}try{const body=JSON.parse(output);if(body.ok===true&&Number.isInteger(body.result?.message_id)){finish(undefined,String(body.result.message_id));return;}const code=Number.isInteger(body.error_code)?String(body.error_code):undefined;finish(new TelegramDeliveryError('telegram_rejected',code));}catch{finish(new TelegramDeliveryError('upstream_failed'))}});
  child.stdin.on('error',()=>{});child.stdin.end(curlConfig(config,payload));
 });
}

import { spawn } from 'node:child_process';
import { telegramMessage,type NotificationLead } from './telegram-message';
export type TelegramConfig={token?:string;chatId?:string;proxyUrl?:string};
export class TelegramDeliveryError extends Error{constructor(public code:'not_configured'|'proxy_invalid'|'network_error'|'telegram_rejected'|'timeout'|'upstream_failed',public detail?:string){super(code);this.name='TelegramDeliveryError'}}
export function telegramReady(config:TelegramConfig){return /^\d+:[A-Za-z0-9_-]+$/.test(config.token||'')&&/^-?\d+$/.test(config.chatId||'')&&validProxy(config.proxyUrl)}
export function validProxy(value?:string){try{const u=new URL(value||'');return u.protocol==='socks5h:'&&!!u.hostname&&Number(u.port)>0&&Number(u.port)<=65535}catch{return false}}
function curlConfig(config:TelegramConfig,method:string,payload:string){const quote=(value:string)=>JSON.stringify(value);const ca=process.env.CURL_CA_BUNDLE||process.env.SSL_CERT_FILE;return [
 `url = ${quote(`https://api.telegram.org/bot${config.token}/${method}`)}`,
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
 ...(ca?[`cacert = ${quote(ca)}`]:[]),
 ''
].join('\n')}
async function telegramRequest(config:TelegramConfig,method:'sendMessage'|'getMe'|'getChat'|'getChatMember',data:Record<string,unknown>):Promise<Record<string,unknown>>{
 if(!config.token||!config.chatId||!config.proxyUrl)throw new TelegramDeliveryError('not_configured');
 if(!validProxy(config.proxyUrl))throw new TelegramDeliveryError('proxy_invalid');
 if(!telegramReady(config))throw new TelegramDeliveryError('not_configured');
 const payload=JSON.stringify(data);
 return await new Promise<Record<string,unknown>>((resolve,reject)=>{
  let settled=false,output='';const finish=(error?:Error,result?:Record<string,unknown>)=>{if(settled)return;settled=true;clearTimeout(timer);error?reject(error):resolve(result!)};
  const child=spawn('curl',['--disable','--config','-'],{stdio:['pipe','pipe','ignore']});
  const timer=setTimeout(()=>{child.kill();finish(new TelegramDeliveryError('timeout'))},27000);
  child.stdout.setEncoding('utf8');child.stdout.on('data',(chunk:string)=>{output+=chunk;if(output.length>131072){child.kill();finish(new TelegramDeliveryError('upstream_failed'))}});
  child.on('error',(error:NodeJS.ErrnoException)=>{const code=typeof error.code==='string'&&/^[A-Z0-9_]{1,40}$/.test(error.code)?error.code:'curl_unavailable';finish(new TelegramDeliveryError('network_error',code))});
  child.on('close',(status:number|null)=>{if(settled)return;if(status!==0){finish(new TelegramDeliveryError(status===28?'timeout':'network_error',`curl_${status??'unknown'}`));return;}try{const body=JSON.parse(output);if(body.ok===true&&body.result&&typeof body.result==='object'&&!Array.isArray(body.result)){finish(undefined,body.result);return;}const code=Number.isInteger(body.error_code)?String(body.error_code):undefined;finish(new TelegramDeliveryError('telegram_rejected',code));}catch{finish(new TelegramDeliveryError('upstream_failed'))}});
  child.stdin.on('error',()=>{});child.stdin.end(curlConfig(config,method,payload));
 });
}
export async function sendTelegram(lead:NotificationLead,config:TelegramConfig):Promise<string>{
 const result=await telegramRequest(config,'sendMessage',{chat_id:config.chatId,text:telegramMessage(lead),protect_content:true,link_preview_options:{is_disabled:true}});
 if(!Number.isInteger(result.message_id))throw new TelegramDeliveryError('upstream_failed');
 return String(result.message_id);
}
export async function checkTelegram(config:TelegramConfig){
 const bot=await telegramRequest(config,'getMe',{});
 if(!Number.isInteger(bot.id)||bot.is_bot!==true)throw new TelegramDeliveryError('upstream_failed');
 const chat=await telegramRequest(config,'getChat',{chat_id:config.chatId});
 if(chat.type==='private')return;
 const member=await telegramRequest(config,'getChatMember',{chat_id:config.chatId,user_id:bot.id});
 const permissions=chat.permissions as {can_send_messages?:boolean}|undefined;
 const allowed=member.status==='creator'||(member.status==='administrator'&&(chat.type!=='channel'||member.can_post_messages===true))||(chat.type!=='channel'&&(member.status==='member'?permissions?.can_send_messages!==false:member.status==='restricted'&&member.is_member===true&&member.can_send_messages===true));
 if(!allowed)throw new TelegramDeliveryError('telegram_rejected','send_forbidden');
}
export function telegramFailureHint(error:TelegramDeliveryError){
 if(error.code==='not_configured')return 'Проверьте TELEGRAM_BOT_TOKEN, числовой TELEGRAM_CHAT_ID и TELEGRAM_PROXY_URL в env-файле запущенного процесса.';
 if(error.code==='proxy_invalid')return 'Нужен адрес socks5h://[логин:пароль@]хост:порт. Спецсимволы логина и пароля URL-кодируются.';
 const hints:Record<string,string>={
  ENOENT:'Установите curl и убедитесь, что он доступен в PATH службы.',
  curl_5:'Не удалось разрешить адрес SOCKS5h-прокси. Проверьте его хост и DNS сервера.',
  curl_6:'Не удалось разрешить адрес назначения. Проверьте DNS на прокси.',
  curl_7:'Нет соединения с прокси. Проверьте хост, порт, firewall и доступность прокси с VPS.',
  curl_28:'Истекло время ожидания. Проверьте доступность и скорость прокси.',
  curl_35:'Ошибка TLS. Проверьте сертификаты, системное время и доступ прокси к Telegram:443.',
  curl_60:'Не прошла проверка сертификата. Обновите ca-certificates; проверьте CURL_CA_BUNDLE/SSL_CERT_FILE и системное время.',
  curl_67:'Прокси отклонил авторизацию. Проверьте логин, пароль и URL-кодирование.',
  curl_77:'Не удалось прочитать CA-файл. Проверьте путь и права CURL_CA_BUNDLE/SSL_CERT_FILE.',
  curl_97:'Ошибка SOCKS5. Проверьте тип прокси, авторизацию, IP allowlist и доступ к api.telegram.org:443.',
  '400':'Telegram отклонил запрос. Проверьте Chat ID и наличие бота в целевой группе.',
  '401':'Telegram отклонил токен бота. Проверьте токен в BotFather.',
  '403':'Telegram запретил доступ. Добавьте бота в чат и разрешите отправку сообщений.',
  '404':'Telegram не нашёл бота или ресурс. Проверьте токен и Chat ID.',
  '429':'Лимит Telegram. Подождите перед повторной отправкой.',
  send_forbidden:'Бот не может отправлять сообщения. Проверьте членство и права в группе или канале.'
 };
 return hints[error.detail||'']||(error.code==='timeout'?hints.curl_28:'Проверьте доступность Telegram через SOCKS5h и настройки curl.');
}

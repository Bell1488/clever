import { createServer, type IncomingMessage, type ServerResponse } from 'node:http';
import { readFile,appendFile,mkdir,stat,writeFile,rename } from 'node:fs/promises';
import { resolve,extname,dirname,join,sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomUUID,createHash } from 'node:crypto';
import { createTelegramOutbox } from './telegram-outbox';
import { leadFingerprint } from '../lib/lead-hash';
import { leadSchema } from '../lib/lead-schema';
import { publicLaunchReady } from '../lib/public-launch';
import { articles } from '../lib/articles';
const base=dirname(fileURLToPath(import.meta.url));
const publicDir=resolve(base,'public');
const dataDir=resolve(process.env.DATA_DIR||join(base,'data'));
await mkdir(dataDir,{recursive:true,mode:0o700});
const logPath=join(dataDir,'requests.ndjson');
const deliver=createTelegramOutbox(join(dataDir,'telegram-deliveries.ndjson'));
const leadRecords=new Map<string,Record<string,unknown>>();
try{for(const line of (await readFile(logPath,'utf8')).split('\n').filter(Boolean)){const row=JSON.parse(line);leadRecords.set(row.id,row)}}catch(error){if((error as NodeJS.ErrnoException).code!=='ENOENT')throw error}
const retentionMs=90*24*60*60*1000;
let storageQueue:Promise<unknown>=Promise.resolve();
function withStorage<T>(work:()=>Promise<T>){const task=storageQueue.then(work,work);storageQueue=task.then(()=>undefined,()=>undefined);return task}
async function pruneExpiredLeads(){return withStorage(async()=>{const cutoff=Date.now()-retentionMs;const retained=[...leadRecords.values()].filter(row=>Number(row.createdAt)>=cutoff);if(retained.length===leadRecords.size)return;const temp=logPath+'.tmp';await writeFile(temp,retained.map(row=>JSON.stringify(row)).join('\n')+(retained.length?'\n':''),{mode:0o600});await rename(temp,logPath);leadRecords.clear();for(const row of retained)leadRecords.set(String(row.id),row)})}
await pruneExpiredLeads();
const retentionTimer=setInterval(()=>{void pruneExpiredLeads().catch(()=>console.error('lead_retention_failed'))},24*60*60*1000);retentionTimer.unref();
const localTelegram=()=>({token:process.env.TELEGRAM_BOT_TOKEN,chatId:process.env.TELEGRAM_CHAT_ID,proxyUrl:process.env.TELEGRAM_PROXY_URL});
const routes=['/','/cargo','/blog',...articles.map(article=>`/blog/${article.slug}`),'/contacts','/privacy','/consent','/terms'];
const rate=new Map<string,{count:number;reset:number}>();
const escape=(s:unknown)=>String(s??'').replace(/[&<>"']/g,x=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[x]!));
function json(res:ServerResponse,status:number,value:unknown){res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'});res.end(JSON.stringify(value))}
async function body(req:IncomingMessage){let text='';for await(const chunk of req){text+=chunk;if(Buffer.byteLength(text)>16000)throw new Error('too_large')}return text}
function validUrl(value:string|undefined,host:string){try{const u=new URL(value||'');return u.protocol==='https:'&&(u.hostname===host||u.hostname.endsWith('.'+host))?u.href:''}catch{return ''}}
function siteOrigin(){try{const url=new URL(process.env.SITE_URL||'');return url.protocol==='https:'?url.origin:''}catch{return ''}}
function config(){return {metrikaId:/^\d{5,12}$/.test(process.env.METRIKA_ID||'')?Number(process.env.METRIKA_ID):0,telegramUrl:validUrl(process.env.TELEGRAM_URL,'t.me'),phone:/^\+?[\d\s()-]{10,24}$/.test(process.env.CONTACT_PHONE||'')?process.env.CONTACT_PHONE:'',email:/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(process.env.CONTACT_EMAIL||'')?process.env.CONTACT_EMAIL:'',preview:!publicLaunchReady(process.env,'direct'),portable:true}}
function clientIp(req:IncomingMessage){const remote=req.socket.remoteAddress||'unknown';const loopback=remote==='127.0.0.1'||remote==='::1'||remote==='::ffff:127.0.0.1';const forwarded=req.headers['x-real-ip'];return loopback&&typeof forwarded==='string'&&forwarded.length<=64?forwarded.trim():remote}
const server=createServer(async(req,res)=>{res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('Referrer-Policy','strict-origin-when-cross-origin');res.setHeader('X-Frame-Options','SAMEORIGIN');try{
 const url=new URL(req.url||'/','http://localhost');const path=decodeURIComponent(url.pathname).replace(/\/$/,'')||'/';
 if(path==='/api/site-config'&&req.method==='GET')return json(res,200,config());
 if(path==='/api/requests'&&req.method==='POST'){
  const origin=req.headers.origin;const host=req.headers.host;if(origin&&new URL(origin).host!==host)return json(res,403,{error:'Недопустимый источник запроса.'});
  const ip=clientIp(req);const now=Date.now();const entry=rate.get(ip);if(entry&&entry.reset>now&&entry.count>=10)return json(res,429,{error:'Слишком много запросов. Попробуйте через минуту.'});rate.set(ip,{count:entry&&entry.reset>now?entry.count+1:1,reset:entry&&entry.reset>now?entry.reset:now+60000});if(rate.size>10000)for(const [k,v]of rate)if(v.reset<now)rate.delete(k);
  const parsed=leadSchema.safeParse(JSON.parse(await body(req)));if(!parsed.success)return json(res,400,{error:'Проверьте контакт и согласие на обработку данных.'});
  const d=parsed.data,id=d.requestId||randomUUID();const hash=createHash('sha256').update(leadFingerprint(d)).digest('hex');
  let record=await withStorage(async()=>{const existing=leadRecords.get(id);if(existing)return existing;const fresh={id,name:d.name,contact:d.contact,channel:d.channel,service:d.service,details:d.details,attribution:d.attribution,consentVersion:d.consentVersion,consentAt:now,createdAt:now,payloadHash:hash,deliveryStatus:'pending'};await appendFile(logPath,JSON.stringify(fresh)+'\n',{mode:0o600});leadRecords.set(id,fresh);return fresh});
  if(record.payloadHash!==hash)return json(res,409,{error:'Заявка с этим номером уже содержит другие данные.'});
  const notification=await deliver({...d,id,createdAt:Number(record.createdAt)},localTelegram());if(notification.status==='sent'&&record.deliveryStatus!=='sent')record=await withStorage(async()=>{const latest=leadRecords.get(id)||record;if(latest.deliveryStatus==='sent')return latest;const sent={...latest,deliveryStatus:'sent',telegramMessageId:notification.messageId};await appendFile(logPath,JSON.stringify(sent)+'\n',{mode:0o600});leadRecords.set(id,sent);return sent});
  if(notification.status!=='sent')return json(res,503,{error:'Не удалось отправить заявку в Telegram. Попробуйте ещё раз.'});
  return json(res,201,{id,delivery:'sent'});
 }
 if(req.method!=='GET'&&req.method!=='HEAD')return json(res,405,{error:'Метод не поддерживается.'});
 if(path==='/robots.txt'){res.writeHead(200,{'Content-Type':'text/plain; charset=utf-8'});res.end(publicLaunchReady(process.env,'direct')?'User-agent: *\nAllow: /\nDisallow: /api/\nSitemap: '+siteOrigin()+'/sitemap.xml\n':'User-agent: *\nDisallow: /\n');return;}
 if(path==='/sitemap.xml'){const origin=siteOrigin();if(!publicLaunchReady(process.env,'direct')||!origin)return json(res,404,{error:'Публикация закрыта или не настроен домен.'});res.writeHead(200,{'Content-Type':'application/xml; charset=utf-8'});res.end('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+routes.filter(p=>!['/privacy','/consent','/terms'].includes(p)).map(p=>'<url><loc>'+escape(origin+p)+'</loc></url>').join('')+'</urlset>');return;}
 if(!routes.includes(path)&&!path.startsWith('/assets/')&&!['/favicon.svg','/logo-klever.svg'].includes(path)){res.writeHead(404);res.end('Not found');return;}
 const file=resolve(publicDir,'.'+(routes.includes(path)?(path==='/'?'/index.html':path+'/index.html'):path));if(!file.startsWith(publicDir+sep)||path.split('/').some(x=>x.startsWith('.'))){res.writeHead(404);res.end('Not found');return;}
 try{if(!(await stat(file)).isFile())throw new Error('missing');const data=await readFile(file);const types:Record<string,string>={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.woff2':'font/woff2'};res.writeHead(200,{'Content-Type':types[extname(file)]||'application/octet-stream','Cache-Control':path.startsWith('/assets/')?'public, max-age=31536000, immutable':'no-cache',...(!publicLaunchReady(process.env,'direct')?{'X-Robots-Tag':'noindex, nofollow'}:{})});res.end(req.method==='HEAD'?undefined:data)}catch{res.writeHead(404,{'Content-Type':'text/plain; charset=utf-8'});res.end('Страница не найдена')}
 }catch(error){if(error instanceof SyntaxError)return json(res,400,{error:'Некорректные данные.'});if((error as Error).message==='too_large')return json(res,413,{error:'Слишком большой запрос.'});console.error('request_failed');return json(res,503,{error:'Временно не удалось обработать запрос. Попробуйте ещё раз.'})}});
const port=Number(process.env.PORT||3000);server.listen(port,process.env.HOST||'127.0.0.1',()=>console.log(`Клевер запущен: http://${process.env.HOST||'127.0.0.1'}:${port}`));

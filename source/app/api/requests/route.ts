import { env } from 'cloudflare:workers';
import { eq } from 'drizzle-orm';
import { getDb } from '@/db';
import { requests } from '@/db/schema';
import { leadSchema } from '@/lib/lead-schema';
import { leadFingerprint } from '@/lib/lead-hash';
import type { NotificationLead } from '@/lib/telegram-message';
async function notify(lead:NotificationLead){
 const config=env as unknown as Record<string,string|undefined>;const {TELEGRAM_RELAY_URL:url,TELEGRAM_RELAY_KEY:key,TELEGRAM_BOT_TOKEN:botToken,TELEGRAM_CHAT_ID:chatId}=config;
 if(!url||!key||key.length<32||!botToken||!chatId)return null;
 try{const parsed=new URL(url);if(parsed.protocol!=='https:'||parsed.username||parsed.password)return null;
 const response=await fetch(url,{method:'POST',headers:{'Content-Type':'application/json',Authorization:'Bearer '+key},body:JSON.stringify({lead,botToken,chatId}),signal:AbortSignal.timeout(15000)});if(!response.ok)return null;
 const body=await response.json() as {messageId?:string};return /^\d+$/.test(body.messageId||'')?body.messageId!:null;}catch{return null;}
}
export async function POST(request:Request){
 try{
  const origin=request.headers.get('origin');if(origin&&origin!==new URL(request.url).origin)return Response.json({error:'Недопустимый источник запроса.'},{status:403});
  if(Number(request.headers.get('content-length')||0)>16000)return Response.json({error:'Слишком большой запрос.'},{status:413});
  const body=await request.text();if(body.length>16000)return Response.json({error:'Слишком большой запрос.'},{status:413});
  const parsed=leadSchema.safeParse(JSON.parse(body));if(!parsed.success)return Response.json({error:'Проверьте контакт и согласие на обработку данных.'},{status:400});
  const d=parsed.data,id=d.requestId||crypto.randomUUID(),actorId=request.headers.get('oai-authenticated-user-id')||'anonymous';
  const hash=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(leadFingerprint(d))))).map(n=>n.toString(16).padStart(2,'0')).join('');
  const db=getDb();const now=Date.now();
  await db.insert(requests).values({id,actorId,name:d.name,contact:d.contact,channel:d.channel,service:d.service,details:d.details,createdAt:now,attribution:JSON.stringify(d.attribution),consentVersion:d.consentVersion,consentAt:now,payloadHash:hash,deliveryStatus:'pending'}).onConflictDoNothing();
  const [record]=await db.select().from(requests).where(eq(requests.id,id)).limit(1);if(!record||record.actorId!==actorId||record.payloadHash!==hash)return Response.json({error:'Заявка изменилась. Обновите страницу и попробуйте ещё раз.'},{status:409});
  if(record.deliveryStatus==='sent')return Response.json({id,delivery:'sent'},{status:200,headers:{'Cache-Control':'no-store'}});
  const messageId=await notify({...d,id,createdAt:record.createdAt});
  if(messageId)await db.update(requests).set({deliveryStatus:'sent',telegramMessageId:messageId}).where(eq(requests.id,id));
  return Response.json({id,delivery:messageId?'sent':'pending'},{status:messageId?201:202,headers:{'Cache-Control':'no-store'}});
 }catch(error){if(error instanceof SyntaxError)return Response.json({error:'Некорректные данные.'},{status:400});console.error('request_save_failed');return Response.json({error:'Не удалось сохранить заявку. Попробуйте ещё раз.'},{status:503});}
}

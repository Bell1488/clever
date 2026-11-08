import { appendFile,readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { leadFingerprint } from '../lib/lead-hash';
import type { NotificationLead } from '../lib/telegram-message';
import { sendTelegram,telegramReady,type TelegramConfig } from '../lib/telegram-node';
export type DeliveryRecord={id:string;hash:string;status:'sent'|'pending';messageId?:string;updatedAt:number};
export function createTelegramOutbox(file:string){const jobs=new Map<string,{hash:string;promise:Promise<DeliveryRecord>}>();let loaded:Promise<void>|null=null;const records=new Map<string,DeliveryRecord>();const load=()=>loaded||=(async()=>{try{for(const line of (await readFile(file,'utf8')).split('\n').filter(Boolean)){const row=JSON.parse(line) as DeliveryRecord;records.set(row.id,row)}}catch(error){if((error as NodeJS.ErrnoException).code!=='ENOENT')throw error}})();
 return async(lead:NotificationLead,config:TelegramConfig)=>{await load();const hash=createHash('sha256').update(leadFingerprint(lead)).digest('hex');const old=records.get(lead.id);if(old&&old.hash!==hash)throw new Error('request_conflict');if(old?.status==='sent')return old;
 const job=jobs.get(lead.id);if(job){if(job.hash!==hash)throw new Error('request_conflict');return job.promise;}
 const pending=(async()=>{let record:DeliveryRecord={id:lead.id,hash,status:'pending',updatedAt:Date.now()};if(telegramReady(config)){try{const messageId=await sendTelegram(lead,config);record={...record,status:'sent',messageId};}catch{}}
 await appendFile(file,JSON.stringify(record)+'\n',{mode:0o600});records.set(lead.id,record);return record;})();jobs.set(lead.id,{hash,promise:pending});try{return await pending}finally{jobs.delete(lead.id)};
 };
}

import { env } from 'cloudflare:workers';
import { publicLaunchReady } from '@/lib/public-launch';
function url(value:unknown,host:string){if(typeof value!=='string')return '';try{const u=new URL(value);return u.protocol==='https:'&&(u.hostname===host||u.hostname.endsWith('.'+host))?u.href:''}catch{return ''}}
export async function GET(){const e=env as unknown as Record<string,string|undefined>;return Response.json({metrikaId:/^\d{5,12}$/.test(e.METRIKA_ID||'')?Number(e.METRIKA_ID):0,telegramUrl:url(e.TELEGRAM_URL,'t.me'),phone:/^\+?[\d\s()-]{10,24}$/.test(e.CONTACT_PHONE||'')?e.CONTACT_PHONE:'',email:/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.CONTACT_EMAIL||'')?e.CONTACT_EMAIL:'',preview:!publicLaunchReady(e),portable:false},{headers:{'Cache-Control':'no-store'}})}

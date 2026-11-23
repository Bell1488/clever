import { env } from 'cloudflare:workers';
export async function GET(){const e=env as unknown as Record<string,string|undefined>;return Response.json({metrikaId:/^\d{5,12}$/.test(e.METRIKA_ID||'')?Number(e.METRIKA_ID):0,telegramUrl:'https://t.me/nerida_obmen',phone:'+7 906 655 2236',email:'info@nerida.cc',portable:false},{headers:{'Cache-Control':'no-store'}})}

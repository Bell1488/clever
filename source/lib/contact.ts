export type ContactChannel='Telegram'|'Телефон';
export function normalizeContact(value:string,preferred?:string):{contact:string;channel:ContactChannel}|null{
 let text=value.trim();
 if(/^(https?:\/\/)?(?:www\.)?t\.me\//i.test(text)){try{const u=new URL(/^https?:/i.test(text)?text:'https://'+text);if(!['t.me','www.t.me'].includes(u.hostname)||u.search||u.hash)return null;text=u.pathname.replace(/^\//,'').replace(/\/$/,'')}catch{return null}}
 if(/^\+?[\d\s()-]+$/.test(text)){const digits=text.replace(/\D/g,'');if(digits.length>=10&&digits.length<=15)return {contact:(text.startsWith('+')?'+':'')+digits,channel:'Телефон'};return null;}
 if(/^@?[a-zA-Z][a-zA-Z0-9_]{4,31}$/.test(text))return {contact:'@'+text.replace(/^@/,''),channel:'Telegram'};
 return null;
}

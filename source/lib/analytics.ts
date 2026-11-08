import type { PublicConfig } from './company';
export type Goal='telegram_delivered'|'lead_open'|'lead_start'|'lead_submit'|'lead_success'|'payment_lead_success'|'cargo_lead_success'|'lead_error'|'lead_validation_error'|'click_telegram'|'telegram_form_open'|'click_phone'|'click_email'|'payment_calculator_use'|'payment_service_select'|'cargo_calculator_use'|'cargo_transport_select'|'cargo_calculation_copy'|'checklist_copy'|'blog_article_open'|'blog_article_read'|'requisites_view'|'requisites_check'|'consent_view'|'privacy_view'|'terms_view'|'cookie_accept'|'cookie_reject';
declare global{interface Window{__KLEVER_CONFIG?:PublicConfig;ym?:((...args:unknown[])=>void)&{a?:unknown[][];l?:number}}}
let initialized=false;
export const analyticsConsent=()=>{try{return localStorage.getItem('klever_analytics_consent')==='yes'}catch{return false}};
export function safeUrl(){const q=new URLSearchParams();const actual=new URLSearchParams(location.search);for(const key of ['utm_source','utm_medium','utm_campaign','utm_content','utm_term','yclid']){const v=actual.get(key);if(v)q.set(key,v.replace(/[<>\u0000-\u001f]/g,'').slice(0,200))}return location.origin+location.pathname+(q.size?'?'+q.toString():'');}
export function startMetrika(config:PublicConfig){if(initialized||!config.metrikaId||config.preview||!analyticsConsent())return;initialized=true;if(!window.ym){const queue=((...args:unknown[])=>{queue.a=queue.a||[];queue.a.push(args)}) as NonNullable<Window['ym']>;queue.l=Date.now();window.ym=queue;}
 window.ym(config.metrikaId,'init',{clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:false,url:safeUrl(),referrer:document.referrer?new URL(document.referrer).origin:'',params:{site_brand:'klever'}});
 if(!document.querySelector('script[data-klever-metrika]')){const script=document.createElement('script');script.async=true;script.src='https://mc.yandex.ru/metrika/tag.js';script.dataset.kleverMetrika='true';document.head.appendChild(script);}
}
const safeKeys=new Set(['service','channel','placement','transport','article','reason','page']);
export function trackGoal(goal:Goal,params:Record<string,string>={}){if(typeof window==='undefined')return;const clean=Object.fromEntries(Object.entries(params).filter(([k,v])=>safeKeys.has(k)&&typeof v==='string'&&v.length<100));const event={goal,params:clean,page:location.pathname,time:Date.now()};window.dispatchEvent(new CustomEvent('klever:goal',{detail:event}));
 if(new URLSearchParams(location.search).get('analytics_debug')==='1'){try{const list=JSON.parse(sessionStorage.getItem('klever_goal_debug')||'[]');sessionStorage.setItem('klever_goal_debug',JSON.stringify([...list,event].slice(-80)))}catch{}}
 const c=window.__KLEVER_CONFIG;if(c?.metrikaId&&!c.preview&&analyticsConsent()){startMetrika(c);window.ym?.(c.metrikaId,'reachGoal',goal,clean);}}
const attributionKeys=['utm_source','utm_medium','utm_campaign','utm_content','utm_term','yclid'] as const;
export function captureAttribution(){try{const query=new URLSearchParams(location.search);const found:Record<string,string>={};for(const k of attributionKeys){const value=query.get(k);if(value)found[k]=value.replace(/[\u0000-\u001f<>]/g,'').slice(0,200);}if(Object.keys(found).length)sessionStorage.setItem('klever_attribution',JSON.stringify(found));}catch{}}
export function getAttribution():Record<string,string>{try{return JSON.parse(sessionStorage.getItem('klever_attribution')||'{}')}catch{return {}}}

export function stopMetrika(){const config=window.__KLEVER_CONFIG;if(initialized&&config?.metrikaId){if(Array.isArray(window.ym?.a))window.ym!.a=[];else window.ym?.(config.metrikaId,'destruct');initialized=false;}}

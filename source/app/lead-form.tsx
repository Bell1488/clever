'use client';
import { useRef,useState,type FormEvent } from 'react';
import { ArrowUpRight, CheckCircle2, LoaderCircle } from 'lucide-react';
import { COMPANY } from '@/lib/company';
import { normalizeContact } from '@/lib/contact';
import { getAttribution,trackGoal } from '@/lib/analytics';
type Props={service:string;details?:string;channel?:string;inline?:boolean;disabled?:boolean;onClose?:()=>void;onSendingChange?:(value:boolean)=>void};
type Receipt={id:string;delivery:'sent'|'pending'};
function newRequestId(){if(typeof crypto.randomUUID==='function')return crypto.randomUUID();const bytes=crypto.getRandomValues(new Uint8Array(16));bytes[6]=(bytes[6]&15)|64;bytes[8]=(bytes[8]&63)|128;const hex=Array.from(bytes,n=>n.toString(16).padStart(2,'0')).join('');return [hex.slice(0,8),hex.slice(8,12),hex.slice(12,16),hex.slice(16,20),hex.slice(20)].join('-');}
export default function LeadForm({service,details='',channel,inline=false,disabled=false,onClose,onSendingChange}:Props){
 const [contact,setContact]=useState(''),[comment,setComment]=useState(''),[consent,setConsent]=useState(false),[sending,setSending]=useState(false),[error,setError]=useState(''),[receipt,setReceipt]=useState<Receipt|null>(null);
 const busy=useRef(false),started=useRef(false),opened=useRef(false),key=useRef<{signature:string;id:string}|null>(null),done=useRef(new Set<string>());
 function begin(){if(inline&&!opened.current){trackGoal('lead_open',{service,placement:'payment_calculator'});opened.current=true;}if(!started.current){trackGoal('lead_start',{service,placement:inline?'payment_calculator':'modal'});started.current=true;}}
 function edit(value:string){setContact(value);setReceipt(null);setError('');begin();}
 async function submit(e:FormEvent<HTMLFormElement>){e.preventDefault();if(busy.current||disabled)return;setError('');const normalized=normalizeContact(contact,channel);if(!normalized){trackGoal('lead_validation_error',{service,reason:'contact'});setError('Укажите @username, ссылку t.me или телефон с кодом страны.');return;}if(!consent){setError('Подтвердите согласие на обработку заявки.');return;}
 const formData=new FormData(e.currentTarget);const fullDetails=[details,comment].filter(Boolean).join('\n\n');const signature=JSON.stringify([service,normalized.contact,normalized.channel,fullDetails]);if(key.current?.signature!==signature)key.current={signature,id:newRequestId()};
 const requestId=key.current.id;busy.current=true;setSending(true);onSendingChange?.(true);trackGoal('lead_submit',{service,channel:normalized.channel,placement:inline?'payment_calculator':'modal'});
 try{const response=await fetch('/api/requests',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({requestId,...normalized,service,details:fullDetails,consent,consentVersion:COMPANY.consentVersion,website:String(formData.get('website')||''),attribution:getAttribution()})});const body=await response.json() as {id?:string;delivery?:'sent'|'pending';error?:string};if(!response.ok||!body.id)throw new Error(body.error||'Не удалось отправить заявку. Попробуйте ещё раз.');setReceipt({id:body.id,delivery:body.delivery==='sent'?'sent':'pending'});
 if(!done.current.has(body.id)){done.current.add(body.id);trackGoal('lead_success',{service,channel:normalized.channel});if(service==='Карго')trackGoal('cargo_lead_success',{channel:normalized.channel});else if(service!=='Консультация')trackGoal('payment_lead_success',{service,channel:normalized.channel});}
 if(body.delivery==='sent')trackGoal('telegram_delivered',{service});
 }catch(err){trackGoal('lead_error',{service,reason:'send_failed'});setError(err instanceof Error?err.message:'Ошибка соединения. Попробуйте ещё раз.')}finally{busy.current=false;setSending(false);onSendingChange?.(false)}
 }
 return <form className={`simple-lead-form ym-disable-keys ${inline?'inline-lead':''}`} onSubmit={submit} aria-label={inline?'Быстрая заявка на платёж':'Заявка на услугу'}>
 <input name="website" className="honeypot" aria-hidden="true" tabIndex={-1} autoComplete="off"/>
 <label className="quick-contact-label" htmlFor={inline?'quick-contact':'modal-contact'}>{inline?'Куда написать вам?':'Telegram или телефон'}<input id={inline?'quick-contact':'modal-contact'} name="contact" type="text" inputMode="text" autoComplete="off" placeholder="@username или +7 999 123-45-67" value={contact} onChange={e=>edit(e.target.value)} required maxLength={100} minLength={5} disabled={sending||receipt?.delivery==='sent'} autoFocus={!inline}/></label>
 {!inline&&<label className="simple-comment">Комментарий <span>необязательно</span><textarea value={comment} onChange={e=>{setComment(e.target.value);setReceipt(null);begin()}} placeholder="Сумма, ссылка на товар или ваш вопрос" maxLength={2000} rows={3} disabled={sending||receipt?.delivery==='sent'}/></label>}
 <label className="quick-consent"><input name="consent" type="checkbox" checked={consent} onChange={e=>{setConsent(e.target.checked);begin()}} required disabled={sending||receipt?.delivery==='sent'}/><span>Даю <a href="/consent" target="_blank" rel="noopener noreferrer">согласие на обработку данных</a> ООО «Клевер» для связи по заявке.</span></label>
 {error&&<p className="form-error" role="alert">{error}</p>}
 <button className="btn primary wide" type="submit" disabled={sending||disabled||receipt?.delivery==='sent'}>{sending?<><LoaderCircle size={17} className="spin"/>Отправляем…</>:receipt?.delivery==='sent'?<>Заявка отправлена <CheckCircle2 size={18}/></>:receipt?<>Повторить отправку <ArrowUpRight size={18}/></>:<>Оставить заявку <ArrowUpRight size={18}/></>}</button>
 {receipt&&<div className={`quick-receipt ${receipt.delivery}`} role="status"><strong>{receipt.delivery==='sent'?'Готово, заявка отправлена в Telegram.':'Заявка сохранена.'}</strong><span>{receipt.delivery==='sent'?'Свяжемся с вами по указанному контакту.':'Уведомление в Telegram пока ожидает отправки.'}</span><small>№ {receipt.id.slice(0,8)}</small></div>}
 {onClose&&receipt&&<button className="btn ghost wide" type="button" onClick={onClose}>Вернуться на сайт</button>}
 </form>;
}

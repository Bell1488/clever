'use client';
import { useEffect,useState } from 'react';
import { DEFAULT_CONFIG,type PublicConfig } from '@/lib/company';
import { captureAttribution,startMetrika,trackGoal } from '@/lib/analytics';

export function usePublicConfig(){const [config,setConfig]=useState<PublicConfig>(DEFAULT_CONFIG);useEffect(()=>{const update=()=>setConfig(window.__KLEVER_CONFIG||DEFAULT_CONFIG);update();window.addEventListener('klever:config',update);return()=>window.removeEventListener('klever:config',update)},[]);return config;}

export default function AnalyticsProvider(){
 const [debug,setDebug]=useState(false),[events,setEvents]=useState<string[]>([]);
 useEffect(()=>{
  captureAttribution();setDebug(new URLSearchParams(location.search).get('analytics_debug')==='1');
  window.__KLEVER_CONFIG=DEFAULT_CONFIG;window.dispatchEvent(new Event('klever:config'));
  const onGoal=(event:Event)=>{const goal=(event as CustomEvent).detail?.goal;if(typeof goal==='string')setEvents(items=>[...items,goal].slice(-40))};
  window.addEventListener('klever:goal',onGoal);
  const clicks=(event:MouseEvent)=>{const el=(event.target as Element).closest<HTMLElement>('[data-goal]');if(el)trackGoal(el.dataset.goal as Parameters<typeof trackGoal>[0],{placement:el.dataset.placement||'page',...(el.dataset.article?{article:el.dataset.article}:{})})};
  document.addEventListener('click',clicks);
  startMetrika(DEFAULT_CONFIG);
  fetch('/api/site-config').then(r=>r.ok?r.json():Promise.reject()).then(c=>{const value={...DEFAULT_CONFIG,...(c as Partial<PublicConfig>)} as PublicConfig;window.__KLEVER_CONFIG=value;window.dispatchEvent(new Event('klever:config'));startMetrika(value)}).catch(()=>{});
  return()=>{document.removeEventListener('click',clicks);window.removeEventListener('klever:goal',onGoal)};
 },[]);
 return <><noscript><div><img src={`https://mc.yandex.ru/watch/${DEFAULT_CONFIG.metrikaId}`} style={{position:'absolute',left:'-9999px'}} alt=""/></div></noscript>{debug&&<aside className="analytics-debug" data-testid="analytics-debug"><details><summary>Проверка целей · {events.length}</summary><ol>{events.map((goal,i)=><li key={i}>{goal}</li>)}</ol></details></aside>}</>;
}

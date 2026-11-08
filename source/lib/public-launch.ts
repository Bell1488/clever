type LaunchEnv=Record<string,string|undefined>;
function siteOrigin(value:string|undefined){try{const url=new URL(value||'');return url.protocol==='https:'&&url.pathname==='/'&&!url.search&&!url.hash?url.origin:''}catch{return ''}}
export function publicLaunchReady(env:LaunchEnv=process.env,_delivery?:'direct'|'relay'){
 const telegramUrl=(()=>{try{const url=new URL(env.TELEGRAM_URL||'');return url.protocol==='https:'&&(url.hostname==='t.me'||url.hostname.endsWith('.t.me'))}catch{return false}})();
 const proxy=(()=>{try{const url=new URL(env.TELEGRAM_PROXY_URL||'');return url.protocol==='socks5h:'&&Boolean(url.hostname)&&Number(url.port)>0}catch{return false}})();
 return env.PUBLIC_LAUNCH==='true'&&Boolean(siteOrigin(env.SITE_URL))&&/^\d{5,12}$/.test(env.METRIKA_ID||'')&&telegramUrl&&Boolean(env.TELEGRAM_BOT_TOKEN)&&/^-?\d+$/.test(env.TELEGRAM_CHAT_ID||'')&&proxy;
}

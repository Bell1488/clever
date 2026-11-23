import type { MetadataRoute } from 'next';
import { env } from 'cloudflare:workers';

export default function robots():MetadataRoute.Robots{
 const config=env as unknown as Record<string,string|undefined>;
 let origin='';try{if(config.SITE_URL)origin=new URL(config.SITE_URL).origin}catch{}
 if(!origin)return {rules:{userAgent:'*',allow:'/',disallow:'/api/'}};
 return {rules:{userAgent:'*',allow:'/',disallow:'/api/'},sitemap:`${origin}/sitemap.xml`};
}

import type { MetadataRoute } from 'next';
import { env } from 'cloudflare:workers';
import { articles } from '@/lib/articles';

export default function sitemap():MetadataRoute.Sitemap{
 const config=env as unknown as Record<string,string|undefined>;
 let origin='';try{if(config.SITE_URL)origin=new URL(config.SITE_URL).origin}catch{}
 if(!origin)return [];
 const routes=['/','/cargo','/blog','/contacts',...articles.map(article=>`/blog/${article.slug}`)];
 return routes.map(path=>({url:new URL(path,origin).toString()}));
}

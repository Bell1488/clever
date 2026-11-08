import type { MetadataRoute } from 'next';
import { env } from 'cloudflare:workers';
import { articles } from '@/lib/articles';
import { publicLaunchReady } from '@/lib/public-launch';

export default function sitemap():MetadataRoute.Sitemap{
 const config=env as unknown as Record<string,string|undefined>;
 if(!publicLaunchReady(config))return [];
 const origin=new URL(config.SITE_URL!).origin;
 const routes=['/','/cargo','/blog','/contacts',...articles.map(article=>`/blog/${article.slug}`)];
 return routes.map(path=>({url:new URL(path,origin).toString()}));
}

import type { MetadataRoute } from 'next';
import { env } from 'cloudflare:workers';
import { publicLaunchReady } from '@/lib/public-launch';

export default function robots():MetadataRoute.Robots{
 const config=env as unknown as Record<string,string|undefined>;
 if(!publicLaunchReady(config))return {rules:{userAgent:'*',disallow:'/'}};
 const origin=new URL(config.SITE_URL!).origin;
 return {rules:{userAgent:'*',allow:'/',disallow:'/api/'},sitemap:`${origin}/sitemap.xml`};
}

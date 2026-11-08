import type { Metadata } from 'next';
import './globals.css';
import './editorial.css';
import './klever.css';
import AnalyticsProvider from './analytics-provider';
import { env } from 'cloudflare:workers';
import { publicLaunchReady } from '@/lib/public-launch';
export async function generateMetadata():Promise<Metadata>{const config=env as unknown as Record<string,string|undefined>;let siteUrl:URL|undefined;try{if(publicLaunchReady(config))siteUrl=new URL(config.SITE_URL!)}catch{}return {metadataBase:siteUrl,title:'КЛЕВЕР — платежи и доставка из Китая',description:'Пополнение Alipay и WeChat, выкуп на 1688 и Taobao, оплата поставщикам и доставка грузов из Китая.',robots:siteUrl?{index:true,follow:true}:{index:false,follow:false},openGraph:siteUrl?{type:'website',locale:'ru_RU',siteName:'Клевер',title:'Клевер — платежи и доставка из Китая',description:'Пополнение Alipay и WeChat, выкуп товаров и доставка из Китая.'}:undefined,icons:{icon:'/favicon.svg'}}}
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="ru"><body><AnalyticsProvider/>{children}</body></html>}

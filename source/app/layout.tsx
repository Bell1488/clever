import type { Metadata } from 'next';
import './globals.css';
import './editorial.css';
import './klever.css';
import './hero-ticker.css';
import './team-section.css';
import AnalyticsProvider from './analytics-provider';
import { env } from 'cloudflare:workers';
export async function generateMetadata():Promise<Metadata>{const config=env as unknown as Record<string,string|undefined>;let siteUrl:URL|undefined;try{if(config.SITE_URL)siteUrl=new URL(config.SITE_URL)}catch{}return {metadataBase:siteUrl,title:'НЕРИДА — платежи и доставка из Китая',description:'Пополнение Alipay и WeChat, выкуп на 1688 и Taobao, оплата поставщикам и доставка грузов из Китая.',robots:{index:true,follow:true},openGraph:{type:'website',locale:'ru_RU',siteName:'НЕРИДА',title:'НЕРИДА — платежи и доставка из Китая',description:'Пополнение Alipay и WeChat, выкуп товаров и доставка из Китая.'},icons:{icon:'/assets/nerida-favicon.ico'}}}
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="ru"><body><AnalyticsProvider/>{children}</body></html>}

import { notFound } from 'next/navigation';
import { getArticle, articles } from '@/lib/articles';
import ArticleView from '../article-view';
type Props={params:Promise<{slug:string}>};
export function generateStaticParams(){return articles.map(a=>({slug:a.slug}))}
export async function generateMetadata({params}:Props){const {slug}=await params;const a=getArticle(slug);return {title:a?`${a.title} | Блог КЛЕВЕР`:'Статья не найдена | КЛЕВЕР',description:a?.excerpt}}
export default async function Page({params}:Props){const {slug}=await params;const article=getArticle(slug);if(!article)notFound();return <ArticleView article={article}/>}

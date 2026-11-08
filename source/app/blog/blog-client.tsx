import { ChevronRight } from 'lucide-react';
import { articles } from '@/lib/articles';
import { ContentLayout } from '../site';
import { ArticleCard } from '../blog-cards';

export default function BlogClient(){
 return <ContentLayout><section className="container blog-page">
  <div className="breadcrumb"><a href="/">Главная</a><ChevronRight size={12}/><span>Блог</span></div>
  <div className="journal-hero"><div><div className="eyebrow">КЛЕВЕР / ПОЛЕЗНЫЕ МАТЕРИАЛЫ</div><h1>Китай становится<br/><span>понятнее.</span></h1><p>Платежи, закупки и доставка — коротко и по делу.</p></div></div>
  <div className="blog-articles">{articles.map(article=><ArticleCard key={article.slug} article={article}/>)}</div>
 </section></ContentLayout>
}

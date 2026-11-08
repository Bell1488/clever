import Site from '../app/site';
import LegalContent from '../app/legal-content';
import AnalyticsProvider from '../app/analytics-provider';
import BlogClient from '../app/blog/blog-client';
import ArticleView from '../app/blog/article-view';
import { getArticle } from '../lib/articles';
export default function Website({path}:{path:string}){let content;if(path==='/')content=<Site page="home"/>;else if(path==='/cargo')content=<Site page="cargo"/>;else if(path==='/blog')content=<BlogClient/>;else if(path.startsWith('/blog/')){const article=getArticle(path.slice('/blog/'.length));content=article?<ArticleView article={article}/>:<main className="request-page"><h1>Страница не найдена</h1><a href="/blog">К статьям</a></main>}else if(['/contacts','/privacy','/consent','/terms'].includes(path))content=<LegalContent kind={path.slice(1) as 'contacts'|'privacy'|'consent'|'terms'}/>;else content=<main className="request-page"><h1>Страница не найдена</h1><a href="/">На главную</a></main>;return <><AnalyticsProvider/>{content}</>}

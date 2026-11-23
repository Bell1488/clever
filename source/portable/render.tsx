import { renderToString } from 'react-dom/server';
import Website from './website';
import { articles } from '../lib/articles';
export const pages=[['/','НЕРИДА — платежи и доставка из Китая'],['/cargo','Карго из Китая — калькулятор доставки | НЕРИДА'],['/blog','Блог НЕРИДА — о платежах, закупках и доставке из Китая'],...articles.map(article=>[`/blog/${article.slug}`,`${article.title} | Блог НЕРИДА`]),['/contacts','Контакты и реквизиты | НЕРИДА'],['/privacy','Политика обработки данных | НЕРИДА'],['/consent','Согласие на обработку данных | НЕРИДА'],['/terms','Условия работы | НЕРИДА']];
export const render=(path:string)=>renderToString(<Website path={path}/>);

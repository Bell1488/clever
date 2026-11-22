import { renderToString } from 'react-dom/server';
import Website from './website';
import { articles } from '../lib/articles';
export const pages=[['/','НЕКСУС — платежи и доставка из Китая'],['/cargo','Карго из Китая — калькулятор доставки | НЕКСУС'],['/blog','Блог НЕКСУС — о платежах, закупках и доставке из Китая'],...articles.map(article=>[`/blog/${article.slug}`,`${article.title} | Блог НЕКСУС`]),['/contacts','Контакты и реквизиты | НЕКСУС'],['/privacy','Политика обработки данных | НЕКСУС'],['/consent','Согласие на обработку данных | НЕКСУС'],['/terms','Условия работы | НЕКСУС']];
export const render=(path:string)=>renderToString(<Website path={path}/>);

import { renderToString } from 'react-dom/server';
import Website from './website';
import { articles } from '../lib/articles';
export const pages=[['/','Клевер — платежи и доставка из Китая'],['/cargo','Карго из Китая — калькулятор доставки | Клевер'],['/blog','Блог КЛЕВЕР — о платежах, закупках и доставке из Китая'],...articles.map(article=>[`/blog/${article.slug}`,`${article.title} | Блог КЛЕВЕР`]),['/contacts','Контакты и реквизиты | Клевер'],['/privacy','Политика обработки данных | Клевер'],['/consent','Согласие на обработку данных | Клевер'],['/terms','Условия работы | Клевер']];
export const render=(path:string)=>renderToString(<Website path={path}/>);

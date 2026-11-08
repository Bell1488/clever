import { hydrateRoot } from 'react-dom/client';
import Website from './website';
import '../app/globals.css';
import '../app/editorial.css';
import '../app/klever.css';
import '../app/hero-ticker.css';
hydrateRoot(document.getElementById('root')!,<Website path={location.pathname.replace(/\/$/,'')||'/'}/>);

import { build } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import { readFile,writeFile,mkdir,rm,copyFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
const root=process.cwd();const out=resolve(root,'outputs/klever-release/site');
await rm(out,{recursive:true,force:true});await mkdir(out,{recursive:true});
await build({configFile:false,root:resolve(root,'portable'),publicDir:resolve(root,'public'),plugins:[react()],resolve:{alias:{'@':root}},build:{outDir:resolve(out,'public'),emptyOutDir:true,minify:true}});
await build({configFile:false,root,publicDir:false,resolve:{alias:{'@':root}},ssr:{noExternal:true},build:{ssr:resolve(root,'portable/server.ts'),outDir:out,emptyOutDir:false,rollupOptions:{output:{entryFileNames:'server.mjs'}}}});
const renderDir=resolve(root,'outputs/klever-prerender');
await build({configFile:false,root,publicDir:false,plugins:[react()],resolve:{alias:{'@':root}},ssr:{noExternal:['lucide-react']},build:{ssr:resolve(root,'portable/render.tsx'),outDir:renderDir,emptyOutDir:true,rollupOptions:{output:{entryFileNames:'render.mjs'}}}});
const {pages,render}=await import(pathToFileURL(resolve(renderDir,'render.mjs')));
const template=await readFile(resolve(out,'public/index.html'),'utf8');
for(const [path,title]of pages){const dir=resolve(out,'public','.'+path);await mkdir(dir,{recursive:true});const html=template.replace('<title>Клевер — платежи и доставка из Китая</title>',`<title>${title.replaceAll('&','&amp;').replaceAll('<','&lt;')}</title>`).replace('<!--APP-->',render(path));await writeFile(resolve(dir,'index.html'),html);}
await copyFile(resolve(root,'portable/env.example'),resolve(out,'env.example'));
await copyFile(resolve(root,'docs/DEPLOY.md'),resolve(out,'README.md'));
console.log('Portable release: '+out);

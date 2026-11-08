import { build } from 'vite';
import { spawnSync } from 'node:child_process';
import { mkdtemp,rm,access } from 'node:fs/promises';
import { resolve,join } from 'node:path';
import { tmpdir } from 'node:os';
let openssl=process.env.OPENSSL_BIN||'openssl';
if(process.platform==='win32'&&!process.env.OPENSSL_BIN&&spawnSync(openssl,['version'],{stdio:'ignore'}).error){const bundled=join(process.env.ProgramFiles||'C:\\Program Files','Git','usr','bin','openssl.exe');try{await access(bundled);openssl=bundled}catch{}}
const dir=await mkdtemp(join(tmpdir(),'klever-cert-'));try{const cert=join(dir,'ca.pem'),key=join(dir,'key.pem');const ssl=spawnSync(openssl,['req','-x509','-newkey','rsa:2048','-nodes','-keyout',key,'-out',cert,'-days','1','-subj','/CN=api.telegram.org','-addext','subjectAltName=DNS:api.telegram.org'],{stdio:'ignore'});if(ssl.status!==0)throw new Error('Test certificate failed: install OpenSSL or set OPENSSL_BIN to its executable.');
await build({configFile:false,root:process.cwd(),publicDir:false,ssr:{noExternal:true},build:{ssr:resolve('portable/telegram-test.ts'),outDir:resolve('outputs/telegram-test'),emptyOutDir:true,rollupOptions:{output:{entryFileNames:'test.mjs'}}}});
await build({configFile:false,root:process.cwd(),publicDir:false,ssr:{noExternal:true},build:{ssr:resolve('portable/server.ts'),outDir:resolve('outputs/telegram-test'),emptyOutDir:false,rollupOptions:{output:{entryFileNames:'server.mjs'}}}});
const test=spawnSync(process.execPath,[resolve('outputs/telegram-test/test.mjs')],{env:{...process.env,NODE_EXTRA_CA_CERTS:cert,CURL_CA_BUNDLE:cert,TEST_TLS_KEY:key},stdio:'inherit',timeout:30000});if(test.status!==0)throw new Error('SOCKS5h test failed');}finally{await rm(dir,{recursive:true,force:true})}

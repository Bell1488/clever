import assert from 'node:assert/strict';
import { publicLaunchReady } from './public-launch.ts';

const ready={PUBLIC_LAUNCH:'true',SITE_URL:'https://example.test',METRIKA_ID:'12345678',TELEGRAM_URL:'https://t.me/example',TELEGRAM_BOT_TOKEN:'123456:token',TELEGRAM_CHAT_ID:'-100123',TELEGRAM_PROXY_URL:'socks5h://proxy.example:1080'};
assert.equal(publicLaunchReady(ready),true);
assert.equal(publicLaunchReady(ready,'direct'),true);
assert.equal(publicLaunchReady({...ready,SITE_URL:'http://example.test'}),false);
assert.equal(publicLaunchReady({...ready,METRIKA_ID:''}),false);
assert.equal(publicLaunchReady({...ready,TELEGRAM_PROXY_URL:''},'direct'),false);
assert.equal(publicLaunchReady({...ready,TELEGRAM_URL:''}),false);
assert.equal(publicLaunchReady({...ready,PUBLIC_LAUNCH:'false'}),false);
console.log('Public launch checks passed: HTTPS origin, analytics, contact, and Telegram delivery gates.');

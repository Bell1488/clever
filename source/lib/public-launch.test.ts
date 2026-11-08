import assert from 'node:assert/strict';
import { publicLaunchReady } from './public-launch.ts';

assert.equal(publicLaunchReady({PUBLIC_LAUNCH:'true'}),true);
assert.equal(publicLaunchReady({PUBLIC_LAUNCH:'false'}),false);
assert.equal(publicLaunchReady({PUBLIC_LAUNCH:'TRUE'}),false);
assert.equal(publicLaunchReady({}),false);
console.log('Public launch checks passed: PUBLIC_LAUNCH alone controls indexing.');

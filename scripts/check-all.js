// Runs every example in every topic and reports which ones fail or hang.
// Usage: npm run check
import { spawnSync } from 'node:child_process';
import { relative } from 'node:path';
import { ROOT, listTopics, listExamples } from './lib.js';

const TIMEOUT_MS = 30_000;
let passed = 0;
const failed = [];

for (const topic of listTopics()) {
  for (const file of listExamples(topic)) {
    const name = relative(ROOT, file);
    const result = spawnSync(process.execPath, [file], {
      cwd: ROOT,
      encoding: 'utf8',
      timeout: TIMEOUT_MS,
    });

    if (result.status === 0) {
      passed++;
      console.log(`✔ ${name}`);
    } else {
      const reason = result.error?.code === 'ETIMEDOUT'
        ? `timed out after ${TIMEOUT_MS / 1000}s (does it close its servers/timers?)`
        : `exit code ${result.status}`;
      failed.push(name);
      console.log(`✖ ${name} — ${reason}`);
      if (result.stderr) console.log(result.stderr.trim().split('\n').map((l) => `    ${l}`).join('\n'));
    }
  }
}

console.log(`\n${passed} passed, ${failed.length} failed`);
process.exit(failed.length ? 1 : 0);

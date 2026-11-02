// Usage:
//   npm run list                  -> list all topics
//   npm run topic -- caching      -> run every example in a topic, in order
//   npm run topic -- caching 2    -> run only example 02 of that topic
import { spawnSync } from 'node:child_process';
import { basename, relative } from 'node:path';
import { ROOT, listTopics, findTopic, listExamples } from './lib.js';

const [query, exampleNum] = process.argv.slice(2);

if (!query) {
  const topics = listTopics();
  if (topics.length === 0) {
    console.log('No topics yet. Create one with: npm run new -- "Topic Name"');
  } else {
    console.log('Topics:\n');
    for (const t of topics) console.log(`  ${t}  (${listExamples(t).length} examples)`);
    console.log('\nRun one with: npm run topic -- <name or number>');
  }
  process.exit(0);
}

const topic = findTopic(query);
if (!topic) {
  console.error(`No topic matches "${query}". Run "npm run list" to see topics.`);
  process.exit(1);
}

let examples = listExamples(topic);
if (exampleNum) {
  const prefix = exampleNum.padStart(2, '0');
  examples = examples.filter((f) => basename(f).startsWith(prefix));
}
if (examples.length === 0) {
  console.error(`No examples found in topics/${topic}/examples`);
  process.exit(1);
}

for (const file of examples) {
  console.log(`\n${'='.repeat(70)}\n▶ ${relative(ROOT, file)}\n${'='.repeat(70)}\n`);
  const result = spawnSync(process.execPath, [file], { stdio: 'inherit', cwd: ROOT });
  if (result.status !== 0) {
    console.error(`\n✖ ${basename(file)} exited with code ${result.status}`);
    process.exit(result.status ?? 1);
  }
}

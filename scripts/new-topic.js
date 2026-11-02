// Scaffolds a new topic folder from templates/topic.
// Usage: npm run new -- "Consistent Hashing"
//   -> topics/03-consistent-hashing/{README.md, examples/01-basic.js}
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT, TOPICS_DIR, listTopics } from './lib.js';

const title = process.argv.slice(2).join(' ').trim();
if (!title) {
  console.error('Usage: npm run new -- "Topic Name"');
  process.exit(1);
}

const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const existing = listTopics();
if (existing.some((t) => t.slice(t.indexOf('-') + 1) === slug)) {
  console.error(`Topic "${slug}" already exists.`);
  process.exit(1);
}

const next = existing.length ? Number(existing.at(-1).split('-')[0]) + 1 : 1;
const folder = `${String(next).padStart(2, '0')}-${slug}`;
const dir = join(TOPICS_DIR, folder);
const templates = join(ROOT, 'templates', 'topic');

mkdirSync(join(dir, 'examples'), { recursive: true });
const fill = (file) => readFileSync(join(templates, file), 'utf8').replaceAll('{{TITLE}}', title);
writeFileSync(join(dir, 'README.md'), fill('README.md'));
writeFileSync(join(dir, 'examples', '01-basic.js'), fill('01-basic.js'));

console.log(`Created topics/${folder}`);
console.log(`Run it with: npm run topic -- ${slug}`);

// Shared helpers for the project scripts.
import { readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
export const TOPICS_DIR = join(ROOT, 'topics');

// Topic folders look like "01-caching", "02-load-balancing", ...
export function listTopics() {
  if (!existsSync(TOPICS_DIR)) return [];
  return readdirSync(TOPICS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory() && /^\d+-/.test(d.name))
    .map((d) => d.name)
    .sort();
}

// Accepts "01", "1", "caching", or "01-caching" and returns the folder name.
export function findTopic(query) {
  const topics = listTopics();
  const q = String(query).toLowerCase();
  return (
    topics.find((t) => t === q) ||
    topics.find((t) => t.split('-')[0] === q.padStart(2, '0')) ||
    topics.find((t) => t.slice(t.indexOf('-') + 1) === q) ||
    topics.find((t) => t.includes(q))
  );
}

// Runnable examples live in topics/<topic>/examples and start with a number.
export function listExamples(topic) {
  const dir = join(TOPICS_DIR, topic, 'examples');
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => /^\d+.*\.(m?js)$/.test(f))
    .sort()
    .map((f) => join(dir, f));
}

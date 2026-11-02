# System Design Course — instructions for Claude

This is a learning project. The user watches a video on a system design topic,
then gives Claude the topic name. Claude creates a folder for it under
`topics/` and explains the topic **through working code**.

The user is learning, not reviewing: keep explanations simple, but be thorough —
don't skip sub-topics or nuances because they seem obvious.

## Adding a topic

1. `npm run new -- "Topic Name"` — creates `topics/NN-topic-name/` with
   `README.md` and `examples/01-basic.js` from `templates/topic/`.
2. Write the examples (see rules below). Replace the placeholder `01-basic.js`.
3. Fill in every section of the topic README (see checklist below).
4. Add the topic to the table in the root `README.md`.
5. Run `npm run check` — every example in the repo must pass before finishing.

## Example rules

- Plain JavaScript, ES modules, **Node built-ins only** (no npm dependencies).
  Simulate external systems (Redis, Kafka, databases, multiple servers) in-process
  with small classes, `node:http` servers on local ports, `worker_threads`,
  `setTimeout` for latency, etc. If a real tool would normally be used, say so in
  comments and the README.
- Files are numbered and progress from simplest to more realistic:
  `01-basic.js`, `02-...js`, ... Usually 3–6 examples per topic. Include at least
  one example that shows the **problem / failure mode** (what goes wrong without
  the pattern, or a pitfall), not only the happy path.
- Each file starts with a header comment: what it demonstrates and how to run it.
  Comment the *why* in plain language throughout.
- Print clear, labeled console output so running the file tells the story
  (e.g. "cache MISS -> fetching from DB (200ms)").
- Every example must **exit on its own** with code 0 within a few seconds:
  close servers, clear intervals, avoid unbounded loops. `npm run check` enforces
  this with a 30s timeout.
- Prefer clarity over cleverness. Short functions, descriptive names, no
  abstractions the concept doesn't need.
- Shared helpers for a topic (e.g. a fake slow database) may go in
  `topics/NN-x/examples/lib/` — only numbered files are run as examples.

## Topic README checklist

Every topic README must cover (template in `templates/topic/README.md`):

- How to run + table of examples
- The problem it solves
- How it works (plain language, ASCII diagram if helpful)
- Key terms
- Pros / Cons
- When to use it (real-world scenarios)
- When NOT to use it, and what to use instead
- Trade-offs (gain vs. sacrifice)
- Common pitfalls
- Scalability considerations (behavior under load and at scale)
- Related patterns (complementary and contrasting)
- Real-world examples
- Quick recap
- Anything else needed to understand the topic fully (variants, sub-topics)

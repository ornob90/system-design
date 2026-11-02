# System Design Course

Learning system design concepts through **small, runnable code examples**.
Each topic gets its own folder with working code plus a README covering how it
works, pros and cons, when (not) to use it, trade-offs, pitfalls, related
patterns, and scalability.

## Requirements

- Node.js 22+ (no npm dependencies; examples use only Node built-ins)

## Commands

```bash
npm run list                      # list all topics
npm run topic -- caching          # run every example in a topic
npm run topic -- caching 2        # run one example (02-...)
npm run topic -- 1                # topics can be referenced by number too
npm run new -- "Rate Limiting"    # scaffold a new topic folder
npm run check                     # run ALL examples and confirm they work
```

You can also run any example directly: `node topics/01-caching/examples/01-basic.js`.

## Layout

```
topics/
  01-<topic>/
    README.md          # the explanation (start here)
    examples/
      01-basic.js      # simplest version of the idea
      02-....js        # each example builds on the previous one
templates/topic/       # starting point used by `npm run new`
scripts/               # runner, scaffolder, checker
```

## Topics

| # | Topic |
| --- | --- |
| | _None yet_ |

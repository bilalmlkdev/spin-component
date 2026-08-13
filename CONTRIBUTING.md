# Contributing to spin-component

Thanks for considering it. This project is intentionally small and modular,
so most contributions are self-contained.

## Setup

```bash
git clone https://github.com/byllzz/spin-component.git
cd spin-component
npm install
npm test
```

Try the CLI against a scratch folder while developing:

```bash
mkdir /tmp/spin-test && cd /tmp/spin-test
node /path/to/spin-component/bin/spin-component.js Button
```

## Where things live

- `src/cli.js` — argument parsing and interactive prompts
- `src/config.js` — `.spinrc` resolution and defaults
- `src/generate.js` — the actual file-writing logic (pure-ish, easy to test)
- `src/templates/*.js` — the string templates for each generated file
- `test/` — Vitest tests against a real tmp directory

## Good first issues

These are scoped small on purpose:

- **Add a new `style` option** (e.g. `vanilla-extract`, `emotion`). You'd add
  a branch in `src/templates/component.js` and extend the `STYLE_CHOICES`
  array in `src/cli.js`. Add one test in `test/generate.test.js`.
- **Add a `--dry-run` flag** that prints what would be created without
  writing anything.
- **Support Vue or Svelte components** as an alternate `framework` config
  option — this is a bigger one, good if you want to touch more of the
  codebase.
- **Better name validation errors** — right now a bad name just throws; a
  friendlier suggestion (e.g. auto-suggesting the PascalCase version) would
  be a nice touch.

If you want to claim one, comment on the issue (or open one if it doesn't
exist yet) before starting, so two people don't build the same thing.

## Guidelines

- Keep `generate.js` free of any `console.log` — output formatting belongs
  in `cli.js` / `logger.js`, so the generation logic stays testable in
  isolation.
- Every new template option needs a test in `test/generate.test.js`.
- Match the existing code style (plain modern JS + JSDoc types, no build
  step) — that's a deliberate choice so `npx` stays fast and contributors
  don't need a TypeScript toolchain just to fix a typo in a template.

## Commit / PR

- Small, focused PRs get reviewed fastest.
- `npm test` must pass.
- No changeset/versioning ceremony needed for now — just describe what
  changed and why.

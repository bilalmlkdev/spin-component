# spin-component

Generate a React component with a matching test, story, and barrel export -
in one command, with zero config to start.

<!-- ![demo](./demo.gif) -->

```bash
npx spin-component Button
```

```
Generating Button in src/components/Button

  created  src/components/Button/Button.tsx
  created  src/components/Button/Button.module.css
  created  src/components/Button/Button.test.tsx
  created  src/components/Button/Button.stories.tsx
  created  src/components/Button/index.ts

Done. 5 files created.
```

No install, no signup, no scaffolding config to fill out first. Just a name.

## Why

Every React component starts with the same four files, written the same
tedious way, dozens of times a month. `spin-component` generates all of them
at once, matching whatever conventions your team already uses.

## Install

You don't need to install anything to try it - `npx spin-component <Name>`
works standalone. To use it as a project dependency:

```bash
npm install --save-dev spin-component
```

Then add a script:

```json
{
  "scripts": {
    "gen": "spin-component"
  }
}
```

## Usage

```bash
spin-component Button                     # interactive fallback if no name given
spin-component Button --style tailwind    # override styling approach
spin-component Button --lang js           # JS instead of TS
spin-component Button --no-story          # skip the story file
spin-component Button --dir src/ui        # different output directory
spin-component Button --yes               # never prompt; fail if name is missing
```

Re-running the command for an existing component never overwrites files you've
already hand-edited - it skips anything that already exists and tells you so.

## Configuration

Drop a `.spinrc.json` (or `.spinrc`, `.spinrc.js`, or a `spin` key in
`package.json`) in your project root to set team-wide defaults:

```json
{
  "dir": "src/components",
  "style": "css-modules",
  "lang": "ts",
  "test": true,
  "story": true,
  "index": true
}
```

| Option  | Values                                                        | Default             |
| ------- | -------------------------------------------------------------- | -------------------- |
| `dir`   | any path, relative to project root                             | `src/components`     |
| `style` | `css-modules` \| `tailwind` \| `styled-components` \| `plain`   | `css-modules`         |
| `lang`  | `ts` \| `js`                                                    | `ts`                  |
| `test`  | `true` \| `false`                                               | `true`                |
| `story` | `true` \| `false`                                               | `true`                |
| `index` | `true` \| `false`                                               | `true`                |

CLI flags always override the config file for that one run.

## What gets generated

For `spin-component Card` with defaults:

```
src/components/Card/
├── Card.tsx
├── Card.module.css
├── Card.test.tsx
├── Card.stories.tsx
└── index.ts
```

If `src/components/index.ts` already exists as a top-level barrel, its
export line is appended automatically - it's never created from scratch,
since that's a structural choice your project should make deliberately.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) - there are several good-first-issue
sized additions (new style templates, a `--dry-run` flag, framework support
beyond React) already scoped out.

# License (MIT)

```
MIT License

Copyright (c) 2026 Bilal Malik

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```


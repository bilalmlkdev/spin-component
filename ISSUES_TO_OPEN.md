# Good-first-issues to open on GitHub

Copy each block below into a new GitHub issue (title + body). Label each
`good first issue` + `help wanted` when you create it — those two labels
are what make a repo show up in GitHub's own "good first issues" search
that new contributors browse.

---

### Issue 1

**Title:** Add a `--dry-run` flag

**Body:**
Right now `spin-component` writes files immediately. It'd be useful to
preview what *would* be created without touching the filesystem — helpful
for checking `--dir`/`--style` combinations before committing to them.

**Expected behavior:**
```
spin-component Button --dry-run
```
should print the same `created` / `skipped` summary as a real run, but
not actually write anything.

**Where to look:** `src/generate.js` (the `writeIfAbsent` helper is where
the actual `fs.writeFile` call happens) and `src/cli.js` (new flag
definition). A test in `test/generate.test.js` should assert that no files
exist on disk after a dry run.

---

### Issue 2

**Title:** Add a new style template: `vanilla-extract` (or your favorite CSS-in-JS lib)

**Body:**
`src/templates/component.js` currently supports `css-modules`, `tailwind`,
`styled-components`, and `plain`. Adding another styling approach is a
good self-contained first PR.

**Steps:**
1. Add a new branch in `componentTemplate()` in `src/templates/component.js`
2. Add the new option to `STYLE_CHOICES` in `src/cli.js`
3. Add a test in `test/generate.test.js` following the existing style tests

---

### Issue 3

**Title:** Friendlier error message for invalid component names

**Body:**
Right now, running `spin-component myButton` just throws
`Component name "myButton" should be PascalCase, e.g. "SubmitButton".`

It'd be nicer if it suggested the corrected version, e.g.:
```
"myButton" should be PascalCase. Did you mean "MyButton"?
```

**Where to look:** `assertValidName()` in `src/generate.js`.

---

### Issue 4 (bigger — good for someone who wants to touch more of the codebase)

**Title:** Support Vue components via a `framework` config option

**Body:**
Currently this only generates React components. Adding a `framework: 'vue'`
option to `.spinrc` that generates a `.vue` SFC + test instead would open
this up to a much bigger audience.

**Where to look:** `src/templates/` would need a parallel set of Vue
templates, and `src/generate.js`/`src/cli.js` would need a `framework`
option threaded through similarly to `style`/`lang`.

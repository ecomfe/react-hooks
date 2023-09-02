# Project structure

This is a typical pnpm workspace based monorepo, each hook creates a package in `packages` folder, the folder name is dash-cased and without the `use` prefix.

Package name must comform a format of `@huse/foo-bar`.

```bash

packages
│   ├── action-pending
│   ├── window-size
│   ├── foo-bar
│   └── xxx-xxx

```

Each package should named export at least one hook like:

```js
import { useInputValue } from '@huse/input-value';
```

## Unit Tests
Unit tests are recommended, they are placed inside `src/__tests__` folder with an extension of `.test.js`, we highly recommend a 100% of branch coverage.

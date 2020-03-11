# React Hooks

This is a collection of frequently used react hooks to support development within baidu, contributions from community are also welcomed.

## Project structure

This is a typical yarn workspace based monorepo, each hook creates a package in `packages` folder, the folder name is dash-cased and without the `use` prefix.

Package name must comform a format of `@huse/foo-bar`.

Each package should named export at least one hook like:

```js
import {useInputValue} from '@huse/input-value';
```

Unit tests are recommended, they are placed inside `src/__tests__` folder with an extension of `.test.js`, we highly recommend a 100% of branch coverage.

## Document

By now we are unable to publish document online since `docz build` fails, you can find description to package in its `README.md`, or to start a document site locally.

```
yarn
yarn doc:dev
```

Open `http://localhost:3000` to view documents about hooks.

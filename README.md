# React Hooks

This is a collection of frequently used react hooks to support development within baidu, contributions from community are also welcomed.

## Project structure

This is a typical yarn workspace based monorepo, each hook creates a package in `packages` folder, the folder name is dash-cased and without the `use` prefix.

Package name must comform a format of `@ecomfe/use-foo-bar`.

Each package should named export at least hook like:

```js
import {useInputValue} from '@comfe/use-input-value';
```

Unit tests are forced to each hook, they are placed inside `src/__tests__` folder with an extension of `.test.js`, we highly recommend a 100% of branch coverage.

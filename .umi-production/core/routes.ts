// @ts-nocheck
import React from 'react';
import { ApplyPluginsType } from '/Users/yuxiaoyang03/Desktop/react-hooks/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';

export function getRoutes() {
  const routes = [
  {
    "path": "/",
    "component": (props) => require('react').createElement(require('../../node_modules/@umijs/preset-dumi/lib/themes/default/layout.js').default, {
      ...{"menus":{"*":{"*":[{"path":"/","title":"README","meta":{"order":null}},{"title":"Action-pending","path":"/action-pending","meta":{},"children":[{"path":"/action-pending","title":"action-pending","meta":{}},{"path":"/action-pending/changelog","title":"Change Log","meta":{}}]},{"title":"Boolean","path":"/boolean","meta":{},"children":[{"path":"/boolean","title":"boolean","meta":{}},{"path":"/boolean/changelog","title":"Change Log","meta":{}}]},{"title":"Click-outside","path":"/click-outside","meta":{},"children":[{"path":"/click-outside","title":"click-outside","meta":{}},{"path":"/click-outside/changelog","title":"Change Log","meta":{}}]},{"title":"Collection","path":"/collection","meta":{},"children":[{"path":"/collection","title":"collection","meta":{}},{"path":"/collection/changelog","title":"Change Log","meta":{}}]},{"title":"Debounce","path":"/debounce","meta":{},"children":[{"path":"/debounce","title":"debounce","meta":{}},{"path":"/debounce/changelog","title":"Change Log","meta":{}}]},{"title":"Debug","path":"/debug","meta":{},"children":[{"path":"/debug","title":"debug","meta":{}},{"path":"/debug/changelog","title":"Change Log","meta":{}}]},{"title":"Derived-state","path":"/derived-state","meta":{},"children":[{"path":"/derived-state","title":"derived-state","meta":{}},{"path":"/derived-state/changelog","title":"Change Log","meta":{}}]},{"title":"Document-event","path":"/document-event","meta":{},"children":[{"path":"/document-event","title":"document-event","meta":{}},{"path":"/document-event/changelog","title":"Change Log","meta":{}}]},{"title":"Document-title","path":"/document-title","meta":{},"children":[{"path":"/document-title","title":"document-title","meta":{}},{"path":"/document-title/changelog","title":"Change Log","meta":{}}]},{"title":"Effect-ref","path":"/effect-ref","meta":{},"children":[{"path":"/effect-ref","title":"effect-ref","meta":{}},{"path":"/effect-ref/changelog","title":"Change Log","meta":{}}]},{"title":"Element-size","path":"/element-size","meta":{},"children":[{"path":"/element-size","title":"element-size","meta":{}},{"path":"/element-size/changelog","title":"Change Log","meta":{}}]},{"title":"Hover","path":"/hover","meta":{},"children":[{"path":"/hover","title":"hover","meta":{}},{"path":"/hover/changelog","title":"Change Log","meta":{}}]},{"title":"Immer","path":"/immer","meta":{},"children":[{"path":"/immer","title":"immer","meta":{}},{"path":"/immer/changelog","title":"Change Log","meta":{}}]},{"title":"Index","path":"/index","meta":{},"children":[{"path":"/index","title":"huse","meta":{}},{"path":"/index/changelog","title":"Change Log","meta":{}}]},{"title":"Infinite-scroll","path":"/infinite-scroll","meta":{},"children":[{"path":"/infinite-scroll","title":"infinite-scroll","meta":{}},{"path":"/infinite-scroll/changelog","title":"Change Log","meta":{}}]},{"title":"Input-value","path":"/input-value","meta":{},"children":[{"path":"/input-value","title":"input-value","meta":{}},{"path":"/input-value/changelog","title":"Change Log","meta":{}}]},{"title":"Intersection","path":"/intersection","meta":{},"children":[{"path":"/intersection","title":"intersection","meta":{}},{"path":"/intersection/changelog","title":"Change Log","meta":{}}]},{"title":"Local-storage","path":"/local-storage","meta":{},"children":[{"path":"/local-storage","title":"local-storage","meta":{}},{"path":"/local-storage/changelog","title":"Change Log","meta":{}}]},{"title":"Media","path":"/media","meta":{},"children":[{"path":"/media","title":"media","meta":{}},{"path":"/media/changelog","title":"Change Log","meta":{}}]},{"title":"Merged-ref","path":"/merged-ref","meta":{},"children":[{"path":"/merged-ref","title":"merged-ref","meta":{}},{"path":"/merged-ref/changelog","title":"Change Log","meta":{}}]},{"title":"Methods","path":"/methods","meta":{},"children":[{"path":"/methods","title":"methods","meta":{}},{"path":"/methods/changelog","title":"Change Log","meta":{}}]},{"title":"Network","path":"/network","meta":{},"children":[{"path":"/network","title":"network","meta":{}},{"path":"/network/changelog","title":"Change Log","meta":{}}]},{"title":"Number","path":"/number","meta":{},"children":[{"path":"/number","title":"number","meta":{}},{"path":"/number/changelog","title":"Change Log","meta":{}}]},{"title":"Optimistic","path":"/optimistic","meta":{},"children":[{"path":"/optimistic","title":"optimistic","meta":{}},{"path":"/optimistic/changelog","title":"Change Log","meta":{}}]},{"title":"Performance","path":"/performance","meta":{},"children":[{"path":"/performance","title":"performance","meta":{}},{"path":"/performance/changelog","title":"Change Log","meta":{}}]},{"title":"Poll","path":"/poll","meta":{},"children":[{"path":"/poll","title":"poll","meta":{}},{"path":"/poll/changelog","title":"Change Log","meta":{}}]},{"title":"Previous-value","path":"/previous-value","meta":{},"children":[{"path":"/previous-value","title":"previous-value","meta":{}},{"path":"/previous-value/changelog","title":"Change Log","meta":{}}]},{"title":"Request","path":"/request","meta":{},"children":[{"path":"/request","title":"request","meta":{}},{"path":"/request/changelog","title":"Change Log","meta":{}}]},{"title":"Router","path":"/router","meta":{},"children":[{"path":"/router","title":"router","meta":{}},{"path":"/router/changelog","title":"Change Log","meta":{}}]},{"title":"Script","path":"/script","meta":{},"children":[{"path":"/script","title":"script","meta":{}},{"path":"/script/changelog","title":"Change Log","meta":{}}]},{"title":"Scroll-into-view","path":"/scroll-into-view","meta":{},"children":[{"path":"/scroll-into-view","title":"scroll-into-view","meta":{}},{"path":"/scroll-into-view/changelog","title":"Change Log","meta":{}}]},{"title":"Scroll-lock","path":"/scroll-lock","meta":{},"children":[{"path":"/scroll-lock","title":"scroll-lock","meta":{}},{"path":"/scroll-lock/changelog","title":"Change Log","meta":{}}]},{"title":"Scroll-position","path":"/scroll-position","meta":{},"children":[{"path":"/scroll-position","title":"scroll-position","meta":{}},{"path":"/scroll-position/changelog","title":"Change Log","meta":{}}]},{"title":"Selection","path":"/selection","meta":{},"children":[{"path":"/selection","title":"selection","meta":{}},{"path":"/selection/changelog","title":"Change Log","meta":{}}]},{"title":"Snapshot","path":"/snapshot","meta":{},"children":[{"path":"/snapshot","title":"snapshot","meta":{}},{"path":"/snapshot/changelog","title":"Change Log","meta":{}}]},{"title":"Timeout","path":"/timeout","meta":{},"children":[{"path":"/timeout","title":"timeout","meta":{}},{"path":"/timeout/changelog","title":"Change Log","meta":{}}]},{"title":"Transition-state","path":"/transition-state","meta":{},"children":[{"path":"/transition-state","title":"transition-state","meta":{}},{"path":"/transition-state/changelog","title":"Change Log","meta":{}}]},{"title":"Update","path":"/update","meta":{},"children":[{"path":"/update","title":"update","meta":{}},{"path":"/update/changelog","title":"Change Log","meta":{}}]},{"title":"User-media","path":"/user-media","meta":{},"children":[{"path":"/user-media","title":"user-media","meta":{}},{"path":"/user-media/changelog","title":"Change Log","meta":{}}]},{"title":"Web-socket","path":"/web-socket","meta":{},"children":[{"path":"/web-socket","title":"web-socket","meta":{}},{"path":"/web-socket/changelog","title":"Change Log","meta":{}}]},{"title":"Window-size","path":"/window-size","meta":{},"children":[{"path":"/window-size","title":"window-size","meta":{}},{"path":"/window-size/changelog","title":"Change Log","meta":{}}]}]}},"locales":[],"navs":{},"title":"@huse/core","mode":"doc","repoUrl":"https://github.com/ecomfe/react-hooks"},
      ...props,
    }),
    "routes": [
      {
        "path": "/",
        "component": require('../../README.md').default,
        "exact": true,
        "meta": {
          "locale": "en-US",
          "title": "README",
          "order": null
        },
        "title": "README"
      },
      {
        "path": "/action-pending/changelog",
        "component": require('../../packages/action-pending/CHANGELOG.md').default,
        "exact": true,
        "meta": {
          "filePath": "packages/action-pending/CHANGELOG.md",
          "updatedTime": 1598942494000,
          "slugs": [
            {
              "depth": 1,
              "value": "Change Log",
              "heading": "change-log"
            },
            {
              "depth": 2,
              "value": "1.0.3 (2020-09-01)",
              "heading": "103-2020-09-01"
            },
            {
              "depth": 2,
              "value": "1.0.2 (2020-03-31)",
              "heading": "102-2020-03-31"
            },
            {
              "depth": 2,
              "value": "1.0.1 (2020-03-23)",
              "heading": "101-2020-03-23"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes"
            },
            {
              "depth": 1,
              "value": "1.0.0 (2020-03-14)",
              "heading": "100-2020-03-14"
            },
            {
              "depth": 2,
              "value": "0.9.4 (2020-03-13)",
              "heading": "094-2020-03-13"
            },
            {
              "depth": 2,
              "value": "0.9.3 (2020-03-07)",
              "heading": "093-2020-03-07"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes-1"
            },
            {
              "depth": 2,
              "value": "0.9.2 (2020-03-02)",
              "heading": "092-2020-03-02"
            },
            {
              "depth": 2,
              "value": "0.9.1 (2020-02-25)",
              "heading": "091-2020-02-25"
            },
            {
              "depth": 1,
              "value": "0.9.0 (2020-02-14)",
              "heading": "090-2020-02-14"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes-2"
            },
            {
              "depth": 3,
              "value": "Features",
              "heading": "features"
            }
          ],
          "title": "Change Log",
          "group": {
            "path": "/action-pending",
            "title": "Action-pending"
          }
        },
        "title": "Change Log"
      },
      {
        "path": "/action-pending",
        "component": require('../../packages/action-pending/README.md').default,
        "exact": true,
        "meta": {
          "filePath": "packages/action-pending/README.md",
          "updatedTime": 1603783066000,
          "slugs": [
            {
              "depth": 1,
              "value": "action-pending",
              "heading": "action-pending"
            },
            {
              "depth": 2,
              "value": "useActionPending",
              "heading": "useactionpending"
            }
          ],
          "title": "action-pending",
          "group": {
            "path": "/action-pending",
            "title": "Action-pending"
          }
        },
        "title": "action-pending"
      },
      {
        "path": "/boolean/changelog",
        "component": require('../../packages/boolean/CHANGELOG.md').default,
        "exact": true,
        "meta": {
          "filePath": "packages/boolean/CHANGELOG.md",
          "updatedTime": 1598942494000,
          "slugs": [
            {
              "depth": 1,
              "value": "Change Log",
              "heading": "change-log"
            },
            {
              "depth": 2,
              "value": "1.0.3 (2020-09-01)",
              "heading": "103-2020-09-01"
            },
            {
              "depth": 2,
              "value": "1.0.2 (2020-03-31)",
              "heading": "102-2020-03-31"
            },
            {
              "depth": 2,
              "value": "1.0.1 (2020-03-23)",
              "heading": "101-2020-03-23"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes"
            },
            {
              "depth": 1,
              "value": "1.0.0 (2020-03-14)",
              "heading": "100-2020-03-14"
            },
            {
              "depth": 2,
              "value": "0.9.4 (2020-03-13)",
              "heading": "094-2020-03-13"
            },
            {
              "depth": 2,
              "value": "0.9.3 (2020-03-07)",
              "heading": "093-2020-03-07"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes-1"
            },
            {
              "depth": 2,
              "value": "0.9.2 (2020-03-02)",
              "heading": "092-2020-03-02"
            },
            {
              "depth": 2,
              "value": "0.9.1 (2020-02-25)",
              "heading": "091-2020-02-25"
            },
            {
              "depth": 1,
              "value": "0.9.0 (2020-02-14)",
              "heading": "090-2020-02-14"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes-2"
            },
            {
              "depth": 3,
              "value": "Features",
              "heading": "features"
            }
          ],
          "title": "Change Log",
          "group": {
            "path": "/boolean",
            "title": "Boolean"
          }
        },
        "title": "Change Log"
      },
      {
        "path": "/boolean",
        "component": require('../../packages/boolean/README.md').default,
        "exact": true,
        "meta": {
          "filePath": "packages/boolean/README.md",
          "updatedTime": 1603783066000,
          "slugs": [
            {
              "depth": 1,
              "value": "boolean",
              "heading": "boolean"
            },
            {
              "depth": 2,
              "value": "useBoolean",
              "heading": "useboolean"
            },
            {
              "depth": 2,
              "value": "useSwitch",
              "heading": "useswitch"
            },
            {
              "depth": 2,
              "value": "useToggle",
              "heading": "usetoggle"
            }
          ],
          "title": "boolean",
          "group": {
            "path": "/boolean",
            "title": "Boolean"
          }
        },
        "title": "boolean"
      },
      {
        "path": "/click-outside/changelog",
        "component": require('../../packages/click-outside/CHANGELOG.md').default,
        "exact": true,
        "meta": {
          "filePath": "packages/click-outside/CHANGELOG.md",
          "updatedTime": 1598942494000,
          "slugs": [
            {
              "depth": 1,
              "value": "Change Log",
              "heading": "change-log"
            },
            {
              "depth": 2,
              "value": "1.0.2 (2020-09-01)",
              "heading": "102-2020-09-01"
            },
            {
              "depth": 2,
              "value": "1.0.1 (2020-03-23)",
              "heading": "101-2020-03-23"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes"
            },
            {
              "depth": 1,
              "value": "1.0.0 (2020-03-14)",
              "heading": "100-2020-03-14"
            },
            {
              "depth": 2,
              "value": "0.10.4 (2020-03-13)",
              "heading": "0104-2020-03-13"
            },
            {
              "depth": 2,
              "value": "0.10.3 (2020-03-07)",
              "heading": "0103-2020-03-07"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes-1"
            },
            {
              "depth": 2,
              "value": "0.10.2 (2020-03-02)",
              "heading": "0102-2020-03-02"
            },
            {
              "depth": 2,
              "value": "0.10.1 (2020-02-25)",
              "heading": "0101-2020-02-25"
            },
            {
              "depth": 1,
              "value": "0.10.0 (2020-02-25)",
              "heading": "0100-2020-02-25"
            },
            {
              "depth": 3,
              "value": "Features",
              "heading": "features"
            },
            {
              "depth": 2,
              "value": "0.9.1 (2020-02-25)",
              "heading": "091-2020-02-25"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes-2"
            },
            {
              "depth": 1,
              "value": "0.9.0 (2020-02-14)",
              "heading": "090-2020-02-14"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes-3"
            },
            {
              "depth": 3,
              "value": "Features",
              "heading": "features-1"
            }
          ],
          "title": "Change Log",
          "group": {
            "path": "/click-outside",
            "title": "Click-outside"
          }
        },
        "title": "Change Log"
      },
      {
        "path": "/click-outside",
        "component": require('../../packages/click-outside/README.md').default,
        "exact": true,
        "meta": {
          "filePath": "packages/click-outside/README.md",
          "updatedTime": 1603783066000,
          "slugs": [
            {
              "depth": 1,
              "value": "click-outside",
              "heading": "click-outside"
            },
            {
              "depth": 2,
              "value": "useClickOutside",
              "heading": "useclickoutside"
            }
          ],
          "title": "click-outside",
          "group": {
            "path": "/click-outside",
            "title": "Click-outside"
          }
        },
        "title": "click-outside"
      },
      {
        "path": "/collection/changelog",
        "component": require('../../packages/collection/CHANGELOG.md').default,
        "exact": true,
        "meta": {
          "filePath": "packages/collection/CHANGELOG.md",
          "updatedTime": 1598942494000,
          "slugs": [
            {
              "depth": 1,
              "value": "Change Log",
              "heading": "change-log"
            },
            {
              "depth": 2,
              "value": "1.0.3 (2020-09-01)",
              "heading": "103-2020-09-01"
            },
            {
              "depth": 2,
              "value": "1.0.2 (2020-03-31)",
              "heading": "102-2020-03-31"
            },
            {
              "depth": 2,
              "value": "1.0.1 (2020-03-23)",
              "heading": "101-2020-03-23"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes"
            },
            {
              "depth": 1,
              "value": "1.0.0 (2020-03-14)",
              "heading": "100-2020-03-14"
            },
            {
              "depth": 2,
              "value": "0.9.4 (2020-03-13)",
              "heading": "094-2020-03-13"
            },
            {
              "depth": 2,
              "value": "0.9.3 (2020-03-07)",
              "heading": "093-2020-03-07"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes-1"
            },
            {
              "depth": 2,
              "value": "0.9.2 (2020-03-02)",
              "heading": "092-2020-03-02"
            },
            {
              "depth": 2,
              "value": "0.9.1 (2020-02-25)",
              "heading": "091-2020-02-25"
            },
            {
              "depth": 1,
              "value": "0.9.0 (2020-02-14)",
              "heading": "090-2020-02-14"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes-2"
            },
            {
              "depth": 3,
              "value": "Features",
              "heading": "features"
            }
          ],
          "title": "Change Log",
          "group": {
            "path": "/collection",
            "title": "Collection"
          }
        },
        "title": "Change Log"
      },
      {
        "path": "/collection",
        "component": require('../../packages/collection/README.md').default,
        "exact": true,
        "meta": {
          "filePath": "packages/collection/README.md",
          "updatedTime": 1603783066000,
          "slugs": [
            {
              "depth": 1,
              "value": "collection",
              "heading": "collection"
            },
            {
              "depth": 2,
              "value": "useArray",
              "heading": "usearray"
            },
            {
              "depth": 2,
              "value": "useSet",
              "heading": "useset"
            },
            {
              "depth": 2,
              "value": "useMap",
              "heading": "usemap"
            }
          ],
          "title": "collection",
          "group": {
            "path": "/collection",
            "title": "Collection"
          }
        },
        "title": "collection"
      },
      {
        "path": "/debounce/changelog",
        "component": require('../../packages/debounce/CHANGELOG.md').default,
        "exact": true,
        "meta": {
          "filePath": "packages/debounce/CHANGELOG.md",
          "updatedTime": 1598942494000,
          "slugs": [
            {
              "depth": 1,
              "value": "Change Log",
              "heading": "change-log"
            },
            {
              "depth": 2,
              "value": "1.0.2 (2020-09-01)",
              "heading": "102-2020-09-01"
            },
            {
              "depth": 2,
              "value": "1.0.1 (2020-03-23)",
              "heading": "101-2020-03-23"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes"
            },
            {
              "depth": 1,
              "value": "1.0.0 (2020-03-14)",
              "heading": "100-2020-03-14"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes-1"
            },
            {
              "depth": 2,
              "value": "0.11.1 (2020-03-13)",
              "heading": "0111-2020-03-13"
            },
            {
              "depth": 1,
              "value": "0.11.0 (2020-03-07)",
              "heading": "0110-2020-03-07"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes-2"
            },
            {
              "depth": 3,
              "value": "Features",
              "heading": "features"
            },
            {
              "depth": 1,
              "value": "0.10.0 (2020-03-02)",
              "heading": "0100-2020-03-02"
            },
            {
              "depth": 3,
              "value": "Features",
              "heading": "features-1"
            },
            {
              "depth": 1,
              "value": "0.9.0 (2020-02-27)",
              "heading": "090-2020-02-27"
            },
            {
              "depth": 3,
              "value": "Features",
              "heading": "features-2"
            }
          ],
          "title": "Change Log",
          "group": {
            "path": "/debounce",
            "title": "Debounce"
          }
        },
        "title": "Change Log"
      },
      {
        "path": "/debounce",
        "component": require('../../packages/debounce/README.md').default,
        "exact": true,
        "meta": {
          "filePath": "packages/debounce/README.md",
          "updatedTime": 1603783066000,
          "slugs": [
            {
              "depth": 1,
              "value": "debounce",
              "heading": "debounce"
            },
            {
              "depth": 2,
              "value": "useDebouncedValue",
              "heading": "usedebouncedvalue"
            },
            {
              "depth": 2,
              "value": "useDebouncedEffect",
              "heading": "usedebouncedeffect"
            },
            {
              "depth": 2,
              "value": "useDebouncedCallback",
              "heading": "usedebouncedcallback"
            }
          ],
          "title": "debounce",
          "group": {
            "path": "/debounce",
            "title": "Debounce"
          }
        },
        "title": "debounce"
      },
      {
        "path": "/debug/changelog",
        "component": require('../../packages/debug/CHANGELOG.md').default,
        "exact": true,
        "meta": {
          "filePath": "packages/debug/CHANGELOG.md",
          "updatedTime": 1598942494000,
          "slugs": [
            {
              "depth": 1,
              "value": "Change Log",
              "heading": "change-log"
            },
            {
              "depth": 2,
              "value": "1.0.2 (2020-09-01)",
              "heading": "102-2020-09-01"
            },
            {
              "depth": 2,
              "value": "1.0.1 (2020-03-23)",
              "heading": "101-2020-03-23"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes"
            },
            {
              "depth": 1,
              "value": "1.0.0 (2020-03-14)",
              "heading": "100-2020-03-14"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes-1"
            },
            {
              "depth": 2,
              "value": "0.10.1 (2020-03-13)",
              "heading": "0101-2020-03-13"
            },
            {
              "depth": 1,
              "value": "0.10.0 (2020-03-07)",
              "heading": "0100-2020-03-07"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes-2"
            },
            {
              "depth": 3,
              "value": "Features",
              "heading": "features"
            },
            {
              "depth": 1,
              "value": "0.9.0 (2020-03-02)",
              "heading": "090-2020-03-02"
            },
            {
              "depth": 3,
              "value": "Features",
              "heading": "features-1"
            }
          ],
          "title": "Change Log",
          "group": {
            "path": "/debug",
            "title": "Debug"
          }
        },
        "title": "Change Log"
      },
      {
        "path": "/debug",
        "component": require('../../packages/debug/README.md').default,
        "exact": true,
        "meta": {
          "filePath": "packages/debug/README.md",
          "updatedTime": 1603783066000,
          "slugs": [
            {
              "depth": 1,
              "value": "debug",
              "heading": "debug"
            },
            {
              "depth": 2,
              "value": "useRenderTimes",
              "heading": "userendertimes"
            },
            {
              "depth": 2,
              "value": "useChangeTimes",
              "heading": "usechangetimes"
            },
            {
              "depth": 2,
              "value": "useUpdateCause",
              "heading": "useupdatecause"
            }
          ],
          "title": "debug",
          "group": {
            "path": "/debug",
            "title": "Debug"
          }
        },
        "title": "debug"
      },
      {
        "path": "/derived-state/changelog",
        "component": require('../../packages/derived-state/CHANGELOG.md').default,
        "exact": true,
        "meta": {
          "filePath": "packages/derived-state/CHANGELOG.md",
          "updatedTime": 1598942494000,
          "slugs": [
            {
              "depth": 1,
              "value": "Change Log",
              "heading": "change-log"
            },
            {
              "depth": 2,
              "value": "1.0.2 (2020-09-01)",
              "heading": "102-2020-09-01"
            },
            {
              "depth": 2,
              "value": "1.0.1 (2020-03-23)",
              "heading": "101-2020-03-23"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes"
            },
            {
              "depth": 1,
              "value": "1.0.0 (2020-03-14)",
              "heading": "100-2020-03-14"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes-1"
            },
            {
              "depth": 2,
              "value": "0.9.3 (2020-03-13)",
              "heading": "093-2020-03-13"
            },
            {
              "depth": 2,
              "value": "0.9.2 (2020-03-07)",
              "heading": "092-2020-03-07"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes-2"
            },
            {
              "depth": 2,
              "value": "0.9.1 (2020-03-02)",
              "heading": "091-2020-03-02"
            },
            {
              "depth": 1,
              "value": "0.9.0 (2020-02-25)",
              "heading": "090-2020-02-25"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes-3"
            },
            {
              "depth": 3,
              "value": "Features",
              "heading": "features"
            }
          ],
          "title": "Change Log",
          "group": {
            "path": "/derived-state",
            "title": "Derived-state"
          }
        },
        "title": "Change Log"
      },
      {
        "path": "/derived-state",
        "component": require('../../packages/derived-state/README.md').default,
        "exact": true,
        "meta": {
          "filePath": "packages/derived-state/README.md",
          "updatedTime": 1603783066000,
          "slugs": [
            {
              "depth": 1,
              "value": "derived-state",
              "heading": "derived-state"
            },
            {
              "depth": 2,
              "value": "useDerivedState",
              "heading": "usederivedstate"
            }
          ],
          "title": "derived-state",
          "group": {
            "path": "/derived-state",
            "title": "Derived-state"
          }
        },
        "title": "derived-state"
      },
      {
        "path": "/document-event/changelog",
        "component": require('../../packages/document-event/CHANGELOG.md').default,
        "exact": true,
        "meta": {
          "filePath": "packages/document-event/CHANGELOG.md",
          "updatedTime": 1598942494000,
          "slugs": [
            {
              "depth": 1,
              "value": "Change Log",
              "heading": "change-log"
            },
            {
              "depth": 2,
              "value": "1.0.2 (2020-09-01)",
              "heading": "102-2020-09-01"
            },
            {
              "depth": 2,
              "value": "1.0.1 (2020-03-23)",
              "heading": "101-2020-03-23"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes"
            },
            {
              "depth": 1,
              "value": "1.0.0 (2020-03-14)",
              "heading": "100-2020-03-14"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes-1"
            },
            {
              "depth": 2,
              "value": "0.9.5 (2020-03-13)",
              "heading": "095-2020-03-13"
            },
            {
              "depth": 2,
              "value": "0.9.4 (2020-03-07)",
              "heading": "094-2020-03-07"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes-2"
            },
            {
              "depth": 2,
              "value": "0.9.3 (2020-03-02)",
              "heading": "093-2020-03-02"
            },
            {
              "depth": 2,
              "value": "0.9.2 (2020-02-25)",
              "heading": "092-2020-02-25"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes-3"
            },
            {
              "depth": 2,
              "value": "0.9.1 (2020-02-25)",
              "heading": "091-2020-02-25"
            },
            {
              "depth": 1,
              "value": "0.9.0 (2020-02-14)",
              "heading": "090-2020-02-14"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes-4"
            },
            {
              "depth": 3,
              "value": "Features",
              "heading": "features"
            }
          ],
          "title": "Change Log",
          "group": {
            "path": "/document-event",
            "title": "Document-event"
          }
        },
        "title": "Change Log"
      },
      {
        "path": "/document-event",
        "component": require('../../packages/document-event/README.md').default,
        "exact": true,
        "meta": {
          "filePath": "packages/document-event/README.md",
          "updatedTime": 1603783066000,
          "slugs": [
            {
              "depth": 1,
              "value": "document-event",
              "heading": "document-event"
            },
            {
              "depth": 2,
              "value": "useDocumentEvent",
              "heading": "usedocumentevent"
            }
          ],
          "title": "document-event",
          "group": {
            "path": "/document-event",
            "title": "Document-event"
          }
        },
        "title": "document-event"
      },
      {
        "path": "/document-title/changelog",
        "component": require('../../packages/document-title/CHANGELOG.md').default,
        "exact": true,
        "meta": {
          "filePath": "packages/document-title/CHANGELOG.md",
          "updatedTime": 1598942494000,
          "slugs": [
            {
              "depth": 1,
              "value": "Change Log",
              "heading": "change-log"
            },
            {
              "depth": 2,
              "value": "1.0.2 (2020-09-01)",
              "heading": "102-2020-09-01"
            },
            {
              "depth": 2,
              "value": "1.0.1 (2020-03-23)",
              "heading": "101-2020-03-23"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes"
            },
            {
              "depth": 1,
              "value": "1.0.0 (2020-03-14)",
              "heading": "100-2020-03-14"
            },
            {
              "depth": 2,
              "value": "0.9.4 (2020-03-13)",
              "heading": "094-2020-03-13"
            },
            {
              "depth": 2,
              "value": "0.9.3 (2020-03-07)",
              "heading": "093-2020-03-07"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes-1"
            },
            {
              "depth": 2,
              "value": "0.9.2 (2020-03-02)",
              "heading": "092-2020-03-02"
            },
            {
              "depth": 2,
              "value": "0.9.1 (2020-02-25)",
              "heading": "091-2020-02-25"
            },
            {
              "depth": 1,
              "value": "0.9.0 (2020-02-14)",
              "heading": "090-2020-02-14"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes-2"
            },
            {
              "depth": 3,
              "value": "Features",
              "heading": "features"
            }
          ],
          "title": "Change Log",
          "group": {
            "path": "/document-title",
            "title": "Document-title"
          }
        },
        "title": "Change Log"
      },
      {
        "path": "/document-title",
        "component": require('../../packages/document-title/README.md').default,
        "exact": true,
        "meta": {
          "filePath": "packages/document-title/README.md",
          "updatedTime": 1603783066000,
          "slugs": [
            {
              "depth": 1,
              "value": "document-title",
              "heading": "document-title"
            },
            {
              "depth": 2,
              "value": "useDocumentTitle",
              "heading": "usedocumenttitle"
            }
          ],
          "title": "document-title",
          "group": {
            "path": "/document-title",
            "title": "Document-title"
          }
        },
        "title": "document-title"
      },
      {
        "path": "/effect-ref/changelog",
        "component": require('../../packages/effect-ref/CHANGELOG.md').default,
        "exact": true,
        "meta": {
          "filePath": "packages/effect-ref/CHANGELOG.md",
          "updatedTime": 1598942494000,
          "slugs": [
            {
              "depth": 1,
              "value": "Change Log",
              "heading": "change-log"
            },
            {
              "depth": 2,
              "value": "1.0.2 (2020-09-01)",
              "heading": "102-2020-09-01"
            },
            {
              "depth": 2,
              "value": "1.0.1 (2020-03-23)",
              "heading": "101-2020-03-23"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes"
            },
            {
              "depth": 1,
              "value": "1.0.0 (2020-03-14)",
              "heading": "100-2020-03-14"
            },
            {
              "depth": 2,
              "value": "0.9.4 (2020-03-13)",
              "heading": "094-2020-03-13"
            },
            {
              "depth": 2,
              "value": "0.9.3 (2020-03-07)",
              "heading": "093-2020-03-07"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes-1"
            },
            {
              "depth": 2,
              "value": "0.9.2 (2020-03-02)",
              "heading": "092-2020-03-02"
            },
            {
              "depth": 2,
              "value": "0.9.1 (2020-02-28)",
              "heading": "091-2020-02-28"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes-2"
            },
            {
              "depth": 1,
              "value": "0.9.0 (2020-02-27)",
              "heading": "090-2020-02-27"
            },
            {
              "depth": 3,
              "value": "Features",
              "heading": "features"
            }
          ],
          "title": "Change Log",
          "group": {
            "path": "/effect-ref",
            "title": "Effect-ref"
          }
        },
        "title": "Change Log"
      },
      {
        "path": "/effect-ref",
        "component": require('../../packages/effect-ref/README.md').default,
        "exact": true,
        "meta": {
          "filePath": "packages/effect-ref/README.md",
          "updatedTime": 1603783066000,
          "slugs": [
            {
              "depth": 1,
              "value": "effect-ref",
              "heading": "effect-ref"
            },
            {
              "depth": 2,
              "value": "useEffectRef",
              "heading": "useeffectref"
            }
          ],
          "title": "effect-ref",
          "group": {
            "path": "/effect-ref",
            "title": "Effect-ref"
          }
        },
        "title": "effect-ref"
      },
      {
        "path": "/element-size/changelog",
        "component": require('../../packages/element-size/CHANGELOG.md').default,
        "exact": true,
        "meta": {
          "filePath": "packages/element-size/CHANGELOG.md",
          "updatedTime": 1598942494000,
          "slugs": [
            {
              "depth": 1,
              "value": "Change Log",
              "heading": "change-log"
            },
            {
              "depth": 2,
              "value": "1.0.2 (2020-09-01)",
              "heading": "102-2020-09-01"
            },
            {
              "depth": 2,
              "value": "1.0.1 (2020-03-23)",
              "heading": "101-2020-03-23"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes"
            },
            {
              "depth": 1,
              "value": "1.0.0 (2020-03-14)",
              "heading": "100-2020-03-14"
            },
            {
              "depth": 2,
              "value": "0.9.4 (2020-03-13)",
              "heading": "094-2020-03-13"
            },
            {
              "depth": 2,
              "value": "0.9.3 (2020-03-07)",
              "heading": "093-2020-03-07"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes-1"
            },
            {
              "depth": 2,
              "value": "0.9.2 (2020-03-02)",
              "heading": "092-2020-03-02"
            },
            {
              "depth": 2,
              "value": "0.9.1 (2020-02-28)",
              "heading": "091-2020-02-28"
            },
            {
              "depth": 1,
              "value": "0.9.0 (2020-02-27)",
              "heading": "090-2020-02-27"
            },
            {
              "depth": 3,
              "value": "Features",
              "heading": "features"
            }
          ],
          "title": "Change Log",
          "group": {
            "path": "/element-size",
            "title": "Element-size"
          }
        },
        "title": "Change Log"
      },
      {
        "path": "/element-size",
        "component": require('../../packages/element-size/README.md').default,
        "exact": true,
        "meta": {
          "filePath": "packages/element-size/README.md",
          "updatedTime": 1603783066000,
          "slugs": [
            {
              "depth": 1,
              "value": "element-size",
              "heading": "element-size"
            },
            {
              "depth": 2,
              "value": "useElementResize",
              "heading": "useelementresize"
            },
            {
              "depth": 2,
              "value": "useElementSize",
              "heading": "useelementsize"
            }
          ],
          "title": "element-size",
          "group": {
            "path": "/element-size",
            "title": "Element-size"
          }
        },
        "title": "element-size"
      },
      {
        "path": "/hover/changelog",
        "component": require('../../packages/hover/CHANGELOG.md').default,
        "exact": true,
        "meta": {
          "filePath": "packages/hover/CHANGELOG.md",
          "updatedTime": 1598942494000,
          "slugs": [
            {
              "depth": 1,
              "value": "Change Log",
              "heading": "change-log"
            },
            {
              "depth": 2,
              "value": "1.0.4 (2020-09-01)",
              "heading": "104-2020-09-01"
            },
            {
              "depth": 2,
              "value": "1.0.3 (2020-03-31)",
              "heading": "103-2020-03-31"
            },
            {
              "depth": 2,
              "value": "1.0.2 (2020-03-23)",
              "heading": "102-2020-03-23"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes"
            },
            {
              "depth": 2,
              "value": "1.0.1 (2020-03-17)",
              "heading": "101-2020-03-17"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes-1"
            },
            {
              "depth": 1,
              "value": "1.0.0 (2020-03-14)",
              "heading": "100-2020-03-14"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes-2"
            },
            {
              "depth": 2,
              "value": "0.9.2 (2020-03-13)",
              "heading": "092-2020-03-13"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes-3"
            },
            {
              "depth": 2,
              "value": "0.9.1 (2020-03-07)",
              "heading": "091-2020-03-07"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes-4"
            },
            {
              "depth": 1,
              "value": "0.9.0 (2020-03-02)",
              "heading": "090-2020-03-02"
            },
            {
              "depth": 3,
              "value": "Features",
              "heading": "features"
            }
          ],
          "title": "Change Log",
          "group": {
            "path": "/hover",
            "title": "Hover"
          }
        },
        "title": "Change Log"
      },
      {
        "path": "/hover",
        "component": require('../../packages/hover/README.md').default,
        "exact": true,
        "meta": {
          "filePath": "packages/hover/README.md",
          "updatedTime": 1603783066000,
          "slugs": [
            {
              "depth": 1,
              "value": "hover",
              "heading": "hover"
            },
            {
              "depth": 2,
              "value": "useHover",
              "heading": "usehover"
            }
          ],
          "title": "hover",
          "group": {
            "path": "/hover",
            "title": "Hover"
          }
        },
        "title": "hover"
      },
      {
        "path": "/immer/changelog",
        "component": require('../../packages/immer/CHANGELOG.md').default,
        "exact": true,
        "meta": {
          "filePath": "packages/immer/CHANGELOG.md",
          "updatedTime": 1598942494000,
          "slugs": [
            {
              "depth": 1,
              "value": "Change Log",
              "heading": "change-log"
            },
            {
              "depth": 2,
              "value": "1.0.3 (2020-09-01)",
              "heading": "103-2020-09-01"
            },
            {
              "depth": 2,
              "value": "1.0.2 (2020-03-31)",
              "heading": "102-2020-03-31"
            },
            {
              "depth": 2,
              "value": "1.0.1 (2020-03-23)",
              "heading": "101-2020-03-23"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes"
            },
            {
              "depth": 1,
              "value": "1.0.0 (2020-03-14)",
              "heading": "100-2020-03-14"
            },
            {
              "depth": 2,
              "value": "0.9.4 (2020-03-13)",
              "heading": "094-2020-03-13"
            },
            {
              "depth": 2,
              "value": "0.9.3 (2020-03-07)",
              "heading": "093-2020-03-07"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes-1"
            },
            {
              "depth": 2,
              "value": "0.9.2 (2020-03-02)",
              "heading": "092-2020-03-02"
            },
            {
              "depth": 2,
              "value": "0.9.1 (2020-02-25)",
              "heading": "091-2020-02-25"
            },
            {
              "depth": 1,
              "value": "0.9.0 (2020-02-14)",
              "heading": "090-2020-02-14"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes-2"
            },
            {
              "depth": 3,
              "value": "Features",
              "heading": "features"
            }
          ],
          "title": "Change Log",
          "group": {
            "path": "/immer",
            "title": "Immer"
          }
        },
        "title": "Change Log"
      },
      {
        "path": "/immer",
        "component": require('../../packages/immer/README.md').default,
        "exact": true,
        "meta": {
          "filePath": "packages/immer/README.md",
          "updatedTime": 1603783066000,
          "slugs": [
            {
              "depth": 1,
              "value": "immer",
              "heading": "immer"
            },
            {
              "depth": 2,
              "value": "useImmerState",
              "heading": "useimmerstate"
            },
            {
              "depth": 2,
              "value": "useImmerReducer",
              "heading": "useimmerreducer"
            }
          ],
          "title": "immer",
          "group": {
            "path": "/immer",
            "title": "Immer"
          }
        },
        "title": "immer"
      },
      {
        "path": "/index/changelog",
        "component": require('../../packages/index/CHANGELOG.md').default,
        "exact": true,
        "meta": {
          "filePath": "packages/index/CHANGELOG.md",
          "updatedTime": 1598942494000,
          "slugs": [
            {
              "depth": 1,
              "value": "Change Log",
              "heading": "change-log"
            },
            {
              "depth": 2,
              "value": "1.4.2 (2020-09-01)",
              "heading": "142-2020-09-01"
            },
            {
              "depth": 2,
              "value": "1.4.1 (2020-05-22)",
              "heading": "141-2020-05-22"
            },
            {
              "depth": 1,
              "value": "1.4.0 (2020-05-03)",
              "heading": "140-2020-05-03"
            },
            {
              "depth": 3,
              "value": "Features",
              "heading": "features"
            },
            {
              "depth": 1,
              "value": "1.3.0 (2020-04-21)",
              "heading": "130-2020-04-21"
            },
            {
              "depth": 3,
              "value": "Features",
              "heading": "features-1"
            },
            {
              "depth": 1,
              "value": "1.2.0 (2020-03-31)",
              "heading": "120-2020-03-31"
            },
            {
              "depth": 3,
              "value": "Features",
              "heading": "features-2"
            },
            {
              "depth": 2,
              "value": "1.1.2 (2020-03-23)",
              "heading": "112-2020-03-23"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes"
            },
            {
              "depth": 2,
              "value": "1.1.1 (2020-03-19)",
              "heading": "111-2020-03-19"
            },
            {
              "depth": 1,
              "value": "1.1.0 (2020-03-17)",
              "heading": "110-2020-03-17"
            },
            {
              "depth": 3,
              "value": "Features",
              "heading": "features-3"
            },
            {
              "depth": 1,
              "value": "1.0.0 (2020-03-14)",
              "heading": "100-2020-03-14"
            },
            {
              "depth": 3,
              "value": "Features",
              "heading": "features-4"
            }
          ],
          "title": "Change Log",
          "group": {
            "path": "/index",
            "title": "Index"
          }
        },
        "title": "Change Log"
      },
      {
        "path": "/index",
        "component": require('../../packages/index/README.md').default,
        "exact": true,
        "meta": {
          "filePath": "packages/index/README.md",
          "updatedTime": 1587461110000,
          "slugs": [
            {
              "depth": 1,
              "value": "huse",
              "heading": "huse"
            },
            {
              "depth": 2,
              "value": "Install",
              "heading": "install"
            },
            {
              "depth": 2,
              "value": "Version",
              "heading": "version"
            }
          ],
          "title": "huse",
          "group": {
            "path": "/index",
            "title": "Index"
          }
        },
        "title": "huse"
      },
      {
        "path": "/infinite-scroll/changelog",
        "component": require('../../packages/infinite-scroll/CHANGELOG.md').default,
        "exact": true,
        "meta": {
          "filePath": "packages/infinite-scroll/CHANGELOG.md",
          "updatedTime": 1598942494000,
          "slugs": [
            {
              "depth": 1,
              "value": "Change Log",
              "heading": "change-log"
            },
            {
              "depth": 2,
              "value": "1.1.2 (2020-09-01)",
              "heading": "112-2020-09-01"
            },
            {
              "depth": 2,
              "value": "1.1.1 (2020-05-22)",
              "heading": "111-2020-05-22"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes"
            },
            {
              "depth": 1,
              "value": "1.1.0 (2020-04-21)",
              "heading": "110-2020-04-21"
            },
            {
              "depth": 3,
              "value": "Features",
              "heading": "features"
            },
            {
              "depth": 2,
              "value": "1.0.2 (2020-03-31)",
              "heading": "102-2020-03-31"
            },
            {
              "depth": 2,
              "value": "1.0.1 (2020-03-23)",
              "heading": "101-2020-03-23"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes-1"
            },
            {
              "depth": 1,
              "value": "1.0.0 (2020-03-14)",
              "heading": "100-2020-03-14"
            },
            {
              "depth": 2,
              "value": "0.9.2 (2020-03-13)",
              "heading": "092-2020-03-13"
            },
            {
              "depth": 2,
              "value": "0.9.1 (2020-03-07)",
              "heading": "091-2020-03-07"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes-2"
            },
            {
              "depth": 1,
              "value": "0.9.0 (2020-03-02)",
              "heading": "090-2020-03-02"
            },
            {
              "depth": 3,
              "value": "Features",
              "heading": "features-1"
            }
          ],
          "title": "Change Log",
          "group": {
            "path": "/infinite-scroll",
            "title": "Infinite-scroll"
          }
        },
        "title": "Change Log"
      },
      {
        "path": "/infinite-scroll",
        "component": require('../../packages/infinite-scroll/README.md').default,
        "exact": true,
        "meta": {
          "filePath": "packages/infinite-scroll/README.md",
          "updatedTime": 1603783066000,
          "slugs": [
            {
              "depth": 1,
              "value": "infinite-scroll",
              "heading": "infinite-scroll"
            },
            {
              "depth": 2,
              "value": "useInfiniteScroll",
              "heading": "useinfinitescroll"
            }
          ],
          "title": "infinite-scroll",
          "group": {
            "path": "/infinite-scroll",
            "title": "Infinite-scroll"
          }
        },
        "title": "infinite-scroll"
      },
      {
        "path": "/input-value/changelog",
        "component": require('../../packages/input-value/CHANGELOG.md').default,
        "exact": true,
        "meta": {
          "filePath": "packages/input-value/CHANGELOG.md",
          "updatedTime": 1598942494000,
          "slugs": [
            {
              "depth": 1,
              "value": "Change Log",
              "heading": "change-log"
            },
            {
              "depth": 2,
              "value": "1.0.2 (2020-09-01)",
              "heading": "102-2020-09-01"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes"
            },
            {
              "depth": 2,
              "value": "1.0.1 (2020-03-23)",
              "heading": "101-2020-03-23"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes-1"
            },
            {
              "depth": 1,
              "value": "1.0.0 (2020-03-14)",
              "heading": "100-2020-03-14"
            },
            {
              "depth": 2,
              "value": "0.9.4 (2020-03-13)",
              "heading": "094-2020-03-13"
            },
            {
              "depth": 2,
              "value": "0.9.3 (2020-03-07)",
              "heading": "093-2020-03-07"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes-2"
            },
            {
              "depth": 2,
              "value": "0.9.2 (2020-03-02)",
              "heading": "092-2020-03-02"
            },
            {
              "depth": 2,
              "value": "0.9.1 (2020-02-25)",
              "heading": "091-2020-02-25"
            },
            {
              "depth": 1,
              "value": "0.9.0 (2020-02-14)",
              "heading": "090-2020-02-14"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes-3"
            },
            {
              "depth": 3,
              "value": "Features",
              "heading": "features"
            }
          ],
          "title": "Change Log",
          "group": {
            "path": "/input-value",
            "title": "Input-value"
          }
        },
        "title": "Change Log"
      },
      {
        "path": "/input-value",
        "component": require('../../packages/input-value/README.md').default,
        "exact": true,
        "meta": {
          "filePath": "packages/input-value/README.md",
          "updatedTime": 1603783066000,
          "slugs": [
            {
              "depth": 1,
              "value": "input-value",
              "heading": "input-value"
            },
            {
              "depth": 2,
              "value": "useInputValue",
              "heading": "useinputvalue"
            }
          ],
          "title": "input-value",
          "group": {
            "path": "/input-value",
            "title": "Input-value"
          }
        },
        "title": "input-value"
      },
      {
        "path": "/intersection/changelog",
        "component": require('../../packages/intersection/CHANGELOG.md').default,
        "exact": true,
        "meta": {
          "filePath": "packages/intersection/CHANGELOG.md",
          "updatedTime": 1598942494000,
          "slugs": [
            {
              "depth": 1,
              "value": "Change Log",
              "heading": "change-log"
            },
            {
              "depth": 2,
              "value": "1.1.2 (2020-09-01)",
              "heading": "112-2020-09-01"
            },
            {
              "depth": 2,
              "value": "1.1.1 (2020-03-23)",
              "heading": "111-2020-03-23"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes"
            },
            {
              "depth": 1,
              "value": "1.1.0 (2020-03-19)",
              "heading": "110-2020-03-19"
            },
            {
              "depth": 3,
              "value": "Features",
              "heading": "features"
            },
            {
              "depth": 1,
              "value": "1.0.0 (2020-03-14)",
              "heading": "100-2020-03-14"
            },
            {
              "depth": 2,
              "value": "0.9.4 (2020-03-13)",
              "heading": "094-2020-03-13"
            },
            {
              "depth": 2,
              "value": "0.9.3 (2020-03-07)",
              "heading": "093-2020-03-07"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes-1"
            },
            {
              "depth": 2,
              "value": "0.9.2 (2020-03-02)",
              "heading": "092-2020-03-02"
            },
            {
              "depth": 2,
              "value": "0.9.1 (2020-02-28)",
              "heading": "091-2020-02-28"
            },
            {
              "depth": 1,
              "value": "0.9.0 (2020-02-27)",
              "heading": "090-2020-02-27"
            },
            {
              "depth": 3,
              "value": "Features",
              "heading": "features-1"
            }
          ],
          "title": "Change Log",
          "group": {
            "path": "/intersection",
            "title": "Intersection"
          }
        },
        "title": "Change Log"
      },
      {
        "path": "/intersection",
        "component": require('../../packages/intersection/README.md').default,
        "exact": true,
        "meta": {
          "filePath": "packages/intersection/README.md",
          "updatedTime": 1603783066000,
          "slugs": [
            {
              "depth": 1,
              "value": "intersection",
              "heading": "intersection"
            },
            {
              "depth": 2,
              "value": "useOnScreen",
              "heading": "useonscreen"
            },
            {
              "depth": 2,
              "value": "useOnScreenLazyValue",
              "heading": "useonscreenlazyvalue"
            },
            {
              "depth": 2,
              "value": "useOnScreenCallback",
              "heading": "useonscreencallback"
            }
          ],
          "title": "intersection",
          "group": {
            "path": "/intersection",
            "title": "Intersection"
          }
        },
        "title": "intersection"
      },
      {
        "path": "/local-storage/changelog",
        "component": require('../../packages/local-storage/CHANGELOG.md').default,
        "exact": true,
        "meta": {
          "filePath": "packages/local-storage/CHANGELOG.md",
          "updatedTime": 1598942494000,
          "slugs": [
            {
              "depth": 1,
              "value": "Change Log",
              "heading": "change-log"
            },
            {
              "depth": 2,
              "value": "1.0.2 (2020-09-01)",
              "heading": "102-2020-09-01"
            },
            {
              "depth": 2,
              "value": "1.0.1 (2020-03-23)",
              "heading": "101-2020-03-23"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes"
            },
            {
              "depth": 1,
              "value": "1.0.0 (2020-03-14)",
              "heading": "100-2020-03-14"
            },
            {
              "depth": 2,
              "value": "0.9.4 (2020-03-13)",
              "heading": "094-2020-03-13"
            },
            {
              "depth": 2,
              "value": "0.9.3 (2020-03-07)",
              "heading": "093-2020-03-07"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes-1"
            },
            {
              "depth": 2,
              "value": "0.9.2 (2020-03-02)",
              "heading": "092-2020-03-02"
            },
            {
              "depth": 2,
              "value": "0.9.1 (2020-02-25)",
              "heading": "091-2020-02-25"
            },
            {
              "depth": 1,
              "value": "0.9.0 (2020-02-14)",
              "heading": "090-2020-02-14"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes-2"
            },
            {
              "depth": 3,
              "value": "Features",
              "heading": "features"
            }
          ],
          "title": "Change Log",
          "group": {
            "path": "/local-storage",
            "title": "Local-storage"
          }
        },
        "title": "Change Log"
      },
      {
        "path": "/local-storage",
        "component": require('../../packages/local-storage/README.md').default,
        "exact": true,
        "meta": {
          "filePath": "packages/local-storage/README.md",
          "updatedTime": 1603783066000,
          "slugs": [
            {
              "depth": 1,
              "value": "local-storage",
              "heading": "local-storage"
            },
            {
              "depth": 2,
              "value": "useLocalStorage",
              "heading": "uselocalstorage"
            }
          ],
          "title": "local-storage",
          "group": {
            "path": "/local-storage",
            "title": "Local-storage"
          }
        },
        "title": "local-storage"
      },
      {
        "path": "/media/changelog",
        "component": require('../../packages/media/CHANGELOG.md').default,
        "exact": true,
        "meta": {
          "filePath": "packages/media/CHANGELOG.md",
          "updatedTime": 1598942494000,
          "slugs": [
            {
              "depth": 1,
              "value": "Change Log",
              "heading": "change-log"
            },
            {
              "depth": 2,
              "value": "1.0.2 (2020-09-01)",
              "heading": "102-2020-09-01"
            },
            {
              "depth": 2,
              "value": "1.0.1 (2020-03-23)",
              "heading": "101-2020-03-23"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes"
            },
            {
              "depth": 1,
              "value": "1.0.0 (2020-03-14)",
              "heading": "100-2020-03-14"
            },
            {
              "depth": 2,
              "value": "0.10.3 (2020-03-13)",
              "heading": "0103-2020-03-13"
            },
            {
              "depth": 2,
              "value": "0.10.2 (2020-03-07)",
              "heading": "0102-2020-03-07"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes-1"
            },
            {
              "depth": 2,
              "value": "0.10.1 (2020-03-02)",
              "heading": "0101-2020-03-02"
            },
            {
              "depth": 1,
              "value": "0.10.0 (2020-02-25)",
              "heading": "0100-2020-02-25"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes-2"
            },
            {
              "depth": 3,
              "value": "Features",
              "heading": "features"
            },
            {
              "depth": 1,
              "value": "0.9.0 (2020-02-14)",
              "heading": "090-2020-02-14"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes-3"
            },
            {
              "depth": 3,
              "value": "Features",
              "heading": "features-1"
            }
          ],
          "title": "Change Log",
          "group": {
            "path": "/media",
            "title": "Media"
          }
        },
        "title": "Change Log"
      },
      {
        "path": "/media",
        "component": require('../../packages/media/README.md').default,
        "exact": true,
        "meta": {
          "filePath": "packages/media/README.md",
          "updatedTime": 1603783066000,
          "slugs": [
            {
              "depth": 1,
              "value": "media",
              "heading": "media"
            },
            {
              "depth": 2,
              "value": "useMedia",
              "heading": "usemedia"
            },
            {
              "depth": 2,
              "value": "usePreferDarkMode",
              "heading": "usepreferdarkmode"
            }
          ],
          "title": "media",
          "group": {
            "path": "/media",
            "title": "Media"
          }
        },
        "title": "media"
      },
      {
        "path": "/merged-ref/changelog",
        "component": require('../../packages/merged-ref/CHANGELOG.md').default,
        "exact": true,
        "meta": {
          "filePath": "packages/merged-ref/CHANGELOG.md",
          "updatedTime": 1598942494000,
          "slugs": [
            {
              "depth": 1,
              "value": "Change Log",
              "heading": "change-log"
            },
            {
              "depth": 2,
              "value": "1.1.1 (2020-09-01)",
              "heading": "111-2020-09-01"
            },
            {
              "depth": 1,
              "value": "1.1.0 (2020-03-23)",
              "heading": "110-2020-03-23"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes"
            },
            {
              "depth": 3,
              "value": "Features",
              "heading": "features"
            },
            {
              "depth": 1,
              "value": "1.0.0 (2020-03-14)",
              "heading": "100-2020-03-14"
            },
            {
              "depth": 3,
              "value": "Features",
              "heading": "features-1"
            },
            {
              "depth": 1,
              "value": "0.9.0 (2020-03-13)",
              "heading": "090-2020-03-13"
            },
            {
              "depth": 3,
              "value": "Features",
              "heading": "features-2"
            }
          ],
          "title": "Change Log",
          "group": {
            "path": "/merged-ref",
            "title": "Merged-ref"
          }
        },
        "title": "Change Log"
      },
      {
        "path": "/merged-ref",
        "component": require('../../packages/merged-ref/README.md').default,
        "exact": true,
        "meta": {
          "filePath": "packages/merged-ref/README.md",
          "updatedTime": 1603783066000,
          "slugs": [
            {
              "depth": 1,
              "value": "merged-ref",
              "heading": "merged-ref"
            },
            {
              "depth": 2,
              "value": "useMergedRef",
              "heading": "usemergedref"
            }
          ],
          "title": "merged-ref",
          "group": {
            "path": "/merged-ref",
            "title": "Merged-ref"
          }
        },
        "title": "merged-ref"
      },
      {
        "path": "/methods/changelog",
        "component": require('../../packages/methods/CHANGELOG.md').default,
        "exact": true,
        "meta": {
          "filePath": "packages/methods/CHANGELOG.md",
          "updatedTime": 1598942494000,
          "slugs": [
            {
              "depth": 1,
              "value": "Change Log",
              "heading": "change-log"
            },
            {
              "depth": 2,
              "value": "1.1.2 (2020-09-01)",
              "heading": "112-2020-09-01"
            },
            {
              "depth": 2,
              "value": "1.1.1 (2020-03-31)",
              "heading": "111-2020-03-31"
            },
            {
              "depth": 1,
              "value": "1.1.0 (2020-03-23)",
              "heading": "110-2020-03-23"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes"
            },
            {
              "depth": 3,
              "value": "Features",
              "heading": "features"
            },
            {
              "depth": 1,
              "value": "1.0.0 (2020-03-14)",
              "heading": "100-2020-03-14"
            },
            {
              "depth": 3,
              "value": "Features",
              "heading": "features-1"
            },
            {
              "depth": 1,
              "value": "0.10.0 (2020-03-13)",
              "heading": "0100-2020-03-13"
            },
            {
              "depth": 3,
              "value": "Features",
              "heading": "features-2"
            },
            {
              "depth": 2,
              "value": "0.9.3 (2020-03-07)",
              "heading": "093-2020-03-07"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes-1"
            },
            {
              "depth": 2,
              "value": "0.9.2 (2020-03-02)",
              "heading": "092-2020-03-02"
            },
            {
              "depth": 2,
              "value": "0.9.1 (2020-02-25)",
              "heading": "091-2020-02-25"
            },
            {
              "depth": 1,
              "value": "0.9.0 (2020-02-14)",
              "heading": "090-2020-02-14"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes-2"
            },
            {
              "depth": 3,
              "value": "Features",
              "heading": "features-3"
            }
          ],
          "title": "Change Log",
          "group": {
            "path": "/methods",
            "title": "Methods"
          }
        },
        "title": "Change Log"
      },
      {
        "path": "/methods",
        "component": require('../../packages/methods/README.md').default,
        "exact": true,
        "meta": {
          "filePath": "packages/methods/README.md",
          "updatedTime": 1603783066000,
          "slugs": [
            {
              "depth": 1,
              "value": "methods",
              "heading": "methods"
            },
            {
              "depth": 2,
              "value": "useMethods",
              "heading": "usemethods"
            },
            {
              "depth": 2,
              "value": "useMethods",
              "heading": "usemethods-1"
            },
            {
              "depth": 2,
              "value": "useMethodsExtension",
              "heading": "usemethodsextension"
            },
            {
              "depth": 2,
              "value": "useMethodsNative",
              "heading": "usemethodsnative"
            },
            {
              "depth": 2,
              "value": "useMethodsExtensionNative",
              "heading": "usemethodsextensionnative"
            }
          ],
          "title": "methods",
          "group": {
            "path": "/methods",
            "title": "Methods"
          }
        },
        "title": "methods"
      },
      {
        "path": "/network/changelog",
        "component": require('../../packages/network/CHANGELOG.md').default,
        "exact": true,
        "meta": {
          "filePath": "packages/network/CHANGELOG.md",
          "updatedTime": 1598942494000,
          "slugs": [
            {
              "depth": 1,
              "value": "Change Log",
              "heading": "change-log"
            },
            {
              "depth": 2,
              "value": "1.0.3 (2020-09-01)",
              "heading": "103-2020-09-01"
            },
            {
              "depth": 2,
              "value": "1.0.2 (2020-03-31)",
              "heading": "102-2020-03-31"
            },
            {
              "depth": 2,
              "value": "1.0.1 (2020-03-23)",
              "heading": "101-2020-03-23"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes"
            },
            {
              "depth": 1,
              "value": "1.0.0 (2020-03-14)",
              "heading": "100-2020-03-14"
            },
            {
              "depth": 2,
              "value": "0.9.2 (2020-03-13)",
              "heading": "092-2020-03-13"
            },
            {
              "depth": 2,
              "value": "0.9.1 (2020-03-07)",
              "heading": "091-2020-03-07"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes-1"
            },
            {
              "depth": 1,
              "value": "0.9.0 (2020-03-02)",
              "heading": "090-2020-03-02"
            },
            {
              "depth": 3,
              "value": "Features",
              "heading": "features"
            }
          ],
          "title": "Change Log",
          "group": {
            "path": "/network",
            "title": "Network"
          }
        },
        "title": "Change Log"
      },
      {
        "path": "/network",
        "component": require('../../packages/network/README.md').default,
        "exact": true,
        "meta": {
          "filePath": "packages/network/README.md",
          "updatedTime": 1603783066000,
          "slugs": [
            {
              "depth": 1,
              "value": "network",
              "heading": "network"
            },
            {
              "depth": 2,
              "value": "useOnLine",
              "heading": "useonline"
            }
          ],
          "title": "network",
          "group": {
            "path": "/network",
            "title": "Network"
          }
        },
        "title": "network"
      },
      {
        "path": "/number/changelog",
        "component": require('../../packages/number/CHANGELOG.md').default,
        "exact": true,
        "meta": {
          "filePath": "packages/number/CHANGELOG.md",
          "updatedTime": 1598942494000,
          "slugs": [
            {
              "depth": 1,
              "value": "Change Log",
              "heading": "change-log"
            },
            {
              "depth": 2,
              "value": "1.0.3 (2020-09-01)",
              "heading": "103-2020-09-01"
            },
            {
              "depth": 2,
              "value": "1.0.2 (2020-03-31)",
              "heading": "102-2020-03-31"
            },
            {
              "depth": 2,
              "value": "1.0.1 (2020-03-23)",
              "heading": "101-2020-03-23"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes"
            },
            {
              "depth": 1,
              "value": "1.0.0 (2020-03-14)",
              "heading": "100-2020-03-14"
            },
            {
              "depth": 2,
              "value": "0.9.4 (2020-03-13)",
              "heading": "094-2020-03-13"
            },
            {
              "depth": 2,
              "value": "0.9.3 (2020-03-07)",
              "heading": "093-2020-03-07"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes-1"
            },
            {
              "depth": 2,
              "value": "0.9.2 (2020-03-02)",
              "heading": "092-2020-03-02"
            },
            {
              "depth": 2,
              "value": "0.9.1 (2020-02-25)",
              "heading": "091-2020-02-25"
            },
            {
              "depth": 1,
              "value": "0.9.0 (2020-02-14)",
              "heading": "090-2020-02-14"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes-2"
            },
            {
              "depth": 3,
              "value": "Features",
              "heading": "features"
            }
          ],
          "title": "Change Log",
          "group": {
            "path": "/number",
            "title": "Number"
          }
        },
        "title": "Change Log"
      },
      {
        "path": "/number",
        "component": require('../../packages/number/README.md').default,
        "exact": true,
        "meta": {
          "filePath": "packages/number/README.md",
          "updatedTime": 1603783066000,
          "slugs": [
            {
              "depth": 1,
              "value": "number",
              "heading": "number"
            },
            {
              "depth": 2,
              "value": "useCounter",
              "heading": "usecounter"
            }
          ],
          "title": "number",
          "group": {
            "path": "/number",
            "title": "Number"
          }
        },
        "title": "number"
      },
      {
        "path": "/optimistic/changelog",
        "component": require('../../packages/optimistic/CHANGELOG.md').default,
        "exact": true,
        "meta": {
          "filePath": "packages/optimistic/CHANGELOG.md",
          "updatedTime": 1598942494000,
          "slugs": [
            {
              "depth": 1,
              "value": "Change Log",
              "heading": "change-log"
            },
            {
              "depth": 2,
              "value": "0.9.1 (2020-09-01)",
              "heading": "091-2020-09-01"
            },
            {
              "depth": 1,
              "value": "0.9.0 (2020-03-31)",
              "heading": "090-2020-03-31"
            },
            {
              "depth": 3,
              "value": "Features",
              "heading": "features"
            }
          ],
          "title": "Change Log",
          "group": {
            "path": "/optimistic",
            "title": "Optimistic"
          }
        },
        "title": "Change Log"
      },
      {
        "path": "/optimistic",
        "component": require('../../packages/optimistic/README.md').default,
        "exact": true,
        "meta": {
          "filePath": "packages/optimistic/README.md",
          "updatedTime": 1603783066000,
          "slugs": [
            {
              "depth": 1,
              "value": "optimistic",
              "heading": "optimistic"
            },
            {
              "depth": 3,
              "value": "useOptimisticFactory",
              "heading": "useoptimisticfactory"
            },
            {
              "depth": 3,
              "value": "useOptimisticState",
              "heading": "useoptimisticstate"
            },
            {
              "depth": 3,
              "value": "useOptimisticTask",
              "heading": "useoptimistictask"
            }
          ],
          "title": "optimistic",
          "group": {
            "path": "/optimistic",
            "title": "Optimistic"
          }
        },
        "title": "optimistic"
      },
      {
        "path": "/performance/changelog",
        "component": require('../../packages/performance/CHANGELOG.md').default,
        "exact": true,
        "meta": {
          "filePath": "packages/performance/CHANGELOG.md",
          "updatedTime": 1598942494000,
          "slugs": [
            {
              "depth": 1,
              "value": "Change Log",
              "heading": "change-log"
            },
            {
              "depth": 2,
              "value": "1.0.2 (2020-09-01)",
              "heading": "102-2020-09-01"
            },
            {
              "depth": 2,
              "value": "1.0.1 (2020-03-23)",
              "heading": "101-2020-03-23"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes"
            },
            {
              "depth": 1,
              "value": "1.0.0 (2020-03-14)",
              "heading": "100-2020-03-14"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes-1"
            },
            {
              "depth": 2,
              "value": "0.9.2 (2020-03-13)",
              "heading": "092-2020-03-13"
            },
            {
              "depth": 2,
              "value": "0.9.1 (2020-03-07)",
              "heading": "091-2020-03-07"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes-2"
            },
            {
              "depth": 1,
              "value": "0.9.0 (2020-03-02)",
              "heading": "090-2020-03-02"
            },
            {
              "depth": 3,
              "value": "Features",
              "heading": "features"
            }
          ],
          "title": "Change Log",
          "group": {
            "path": "/performance",
            "title": "Performance"
          }
        },
        "title": "Change Log"
      },
      {
        "path": "/performance",
        "component": require('../../packages/performance/README.md').default,
        "exact": true,
        "meta": {
          "filePath": "packages/performance/README.md",
          "updatedTime": 1603783066000,
          "slugs": [
            {
              "depth": 1,
              "value": "performance",
              "heading": "performance"
            },
            {
              "depth": 2,
              "value": "usePerformanceTiming",
              "heading": "useperformancetiming"
            },
            {
              "depth": 2,
              "value": "useLayoutTiming",
              "heading": "uselayouttiming"
            }
          ],
          "title": "performance",
          "group": {
            "path": "/performance",
            "title": "Performance"
          }
        },
        "title": "performance"
      },
      {
        "path": "/poll/changelog",
        "component": require('../../packages/poll/CHANGELOG.md').default,
        "exact": true,
        "meta": {
          "filePath": "packages/poll/CHANGELOG.md",
          "updatedTime": 1598942494000,
          "slugs": [
            {
              "depth": 1,
              "value": "Change Log",
              "heading": "change-log"
            },
            {
              "depth": 2,
              "value": "1.0.3 (2020-09-01)",
              "heading": "103-2020-09-01"
            },
            {
              "depth": 2,
              "value": "1.0.2 (2020-03-31)",
              "heading": "102-2020-03-31"
            },
            {
              "depth": 2,
              "value": "1.0.1 (2020-03-23)",
              "heading": "101-2020-03-23"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes"
            },
            {
              "depth": 1,
              "value": "1.0.0 (2020-03-14)",
              "heading": "100-2020-03-14"
            },
            {
              "depth": 2,
              "value": "0.9.4 (2020-03-13)",
              "heading": "094-2020-03-13"
            },
            {
              "depth": 2,
              "value": "0.9.3 (2020-03-07)",
              "heading": "093-2020-03-07"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes-1"
            },
            {
              "depth": 2,
              "value": "0.9.2 (2020-03-02)",
              "heading": "092-2020-03-02"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes-2"
            },
            {
              "depth": 2,
              "value": "0.9.1 (2020-02-25)",
              "heading": "091-2020-02-25"
            },
            {
              "depth": 1,
              "value": "0.9.0 (2020-02-23)",
              "heading": "090-2020-02-23"
            },
            {
              "depth": 3,
              "value": "Features",
              "heading": "features"
            }
          ],
          "title": "Change Log",
          "group": {
            "path": "/poll",
            "title": "Poll"
          }
        },
        "title": "Change Log"
      },
      {
        "path": "/poll",
        "component": require('../../packages/poll/README.md').default,
        "exact": true,
        "meta": {
          "filePath": "packages/poll/README.md",
          "updatedTime": 1603783066000,
          "slugs": [
            {
              "depth": 1,
              "value": "poll",
              "heading": "poll"
            },
            {
              "depth": 2,
              "value": "usePoll",
              "heading": "usepoll"
            }
          ],
          "title": "poll",
          "group": {
            "path": "/poll",
            "title": "Poll"
          }
        },
        "title": "poll"
      },
      {
        "path": "/previous-value/changelog",
        "component": require('../../packages/previous-value/CHANGELOG.md').default,
        "exact": true,
        "meta": {
          "filePath": "packages/previous-value/CHANGELOG.md",
          "updatedTime": 1598942494000,
          "slugs": [
            {
              "depth": 1,
              "value": "Change Log",
              "heading": "change-log"
            },
            {
              "depth": 2,
              "value": "1.0.2 (2020-09-01)",
              "heading": "102-2020-09-01"
            },
            {
              "depth": 2,
              "value": "1.0.1 (2020-03-23)",
              "heading": "101-2020-03-23"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes"
            },
            {
              "depth": 1,
              "value": "1.0.0 (2020-03-14)",
              "heading": "100-2020-03-14"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes-1"
            },
            {
              "depth": 2,
              "value": "0.9.4 (2020-03-13)",
              "heading": "094-2020-03-13"
            },
            {
              "depth": 2,
              "value": "0.9.3 (2020-03-07)",
              "heading": "093-2020-03-07"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes-2"
            },
            {
              "depth": 2,
              "value": "0.9.2 (2020-03-02)",
              "heading": "092-2020-03-02"
            },
            {
              "depth": 2,
              "value": "0.9.1 (2020-02-25)",
              "heading": "091-2020-02-25"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes-3"
            },
            {
              "depth": 1,
              "value": "0.9.0 (2020-02-14)",
              "heading": "090-2020-02-14"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes-4"
            },
            {
              "depth": 3,
              "value": "Features",
              "heading": "features"
            }
          ],
          "title": "Change Log",
          "group": {
            "path": "/previous-value",
            "title": "Previous-value"
          }
        },
        "title": "Change Log"
      },
      {
        "path": "/previous-value",
        "component": require('../../packages/previous-value/README.md').default,
        "exact": true,
        "meta": {
          "filePath": "packages/previous-value/README.md",
          "updatedTime": 1603783066000,
          "slugs": [
            {
              "depth": 1,
              "value": "previous-value",
              "heading": "previous-value"
            },
            {
              "depth": 2,
              "value": "usePreviousValue",
              "heading": "usepreviousvalue"
            },
            {
              "depth": 2,
              "value": "useOriginalCopy",
              "heading": "useoriginalcopy"
            },
            {
              "depth": 2,
              "value": "useOriginalDeepCopy",
              "heading": "useoriginaldeepcopy"
            },
            {
              "depth": 2,
              "value": "usePreviousEquals",
              "heading": "usepreviousequals"
            }
          ],
          "title": "previous-value",
          "group": {
            "path": "/previous-value",
            "title": "Previous-value"
          }
        },
        "title": "previous-value"
      },
      {
        "path": "/request/changelog",
        "component": require('../../packages/request/CHANGELOG.md').default,
        "exact": true,
        "meta": {
          "filePath": "packages/request/CHANGELOG.md",
          "updatedTime": 1598942494000,
          "slugs": [
            {
              "depth": 1,
              "value": "Change Log",
              "heading": "change-log"
            },
            {
              "depth": 2,
              "value": "1.1.2 (2020-09-01)",
              "heading": "112-2020-09-01"
            },
            {
              "depth": 2,
              "value": "1.1.1 (2020-03-23)",
              "heading": "111-2020-03-23"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes"
            },
            {
              "depth": 1,
              "value": "1.1.0 (2020-03-19)",
              "heading": "110-2020-03-19"
            },
            {
              "depth": 3,
              "value": "Features",
              "heading": "features"
            },
            {
              "depth": 1,
              "value": "1.0.0 (2020-03-14)",
              "heading": "100-2020-03-14"
            },
            {
              "depth": 2,
              "value": "0.10.2 (2020-03-13)",
              "heading": "0102-2020-03-13"
            },
            {
              "depth": 2,
              "value": "0.10.1 (2020-03-07)",
              "heading": "0101-2020-03-07"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes-1"
            },
            {
              "depth": 1,
              "value": "0.10.0 (2020-03-02)",
              "heading": "0100-2020-03-02"
            },
            {
              "depth": 3,
              "value": "Features",
              "heading": "features-1"
            },
            {
              "depth": 1,
              "value": "0.9.0 (2020-02-25)",
              "heading": "090-2020-02-25"
            },
            {
              "depth": 3,
              "value": "Features",
              "heading": "features-2"
            }
          ],
          "title": "Change Log",
          "group": {
            "path": "/request",
            "title": "Request"
          }
        },
        "title": "Change Log"
      },
      {
        "path": "/request",
        "component": require('../../packages/request/README.md').default,
        "exact": true,
        "meta": {
          "filePath": "packages/request/README.md",
          "updatedTime": 1603783066000,
          "slugs": [
            {
              "depth": 1,
              "value": "request",
              "heading": "request"
            },
            {
              "depth": 2,
              "value": "useRequest",
              "heading": "userequest"
            },
            {
              "depth": 3,
              "value": "Conditional Request",
              "heading": "conditional-request"
            },
            {
              "depth": 3,
              "value": "Strategy",
              "heading": "strategy"
            },
            {
              "depth": 3,
              "value": "Idempotent",
              "heading": "idempotent"
            },
            {
              "depth": 3,
              "value": "Race Condition",
              "heading": "race-condition"
            },
            {
              "depth": 3,
              "value": "Multiple Request",
              "heading": "multiple-request"
            },
            {
              "depth": 2,
              "value": "useRequestCallback",
              "heading": "userequestcallback"
            }
          ],
          "title": "request",
          "group": {
            "path": "/request",
            "title": "Request"
          }
        },
        "title": "request"
      },
      {
        "path": "/router/changelog",
        "component": require('../../packages/router/CHANGELOG.md').default,
        "exact": true,
        "meta": {
          "filePath": "packages/router/CHANGELOG.md",
          "updatedTime": 1598942494000,
          "slugs": [
            {
              "depth": 1,
              "value": "Change Log",
              "heading": "change-log"
            },
            {
              "depth": 2,
              "value": "0.10.1 (2020-09-01)",
              "heading": "0101-2020-09-01"
            },
            {
              "depth": 1,
              "value": "0.10.0 (2020-05-22)",
              "heading": "0100-2020-05-22"
            },
            {
              "depth": 3,
              "value": "Features",
              "heading": "features"
            },
            {
              "depth": 1,
              "value": "0.9.0 (2020-05-03)",
              "heading": "090-2020-05-03"
            },
            {
              "depth": 3,
              "value": "Features",
              "heading": "features-1"
            }
          ],
          "title": "Change Log",
          "group": {
            "path": "/router",
            "title": "Router"
          }
        },
        "title": "Change Log"
      },
      {
        "path": "/router",
        "component": require('../../packages/router/README.md').default,
        "exact": true,
        "meta": {
          "filePath": "packages/router/README.md",
          "updatedTime": 1603783066000,
          "slugs": [
            {
              "depth": 1,
              "value": "router",
              "heading": "router"
            },
            {
              "depth": 2,
              "value": "useNavigate",
              "heading": "usenavigate"
            },
            {
              "depth": 2,
              "value": "useLocationState",
              "heading": "uselocationstate"
            },
            {
              "depth": 2,
              "value": "useSearchParams",
              "heading": "usesearchparams"
            },
            {
              "depth": 2,
              "value": "useSearchParam",
              "heading": "usesearchparam"
            },
            {
              "depth": 2,
              "value": "useSearchParamAll",
              "heading": "usesearchparamall"
            },
            {
              "depth": 2,
              "value": "useUpdateSearchParams",
              "heading": "useupdatesearchparams"
            },
            {
              "depth": 2,
              "value": "useSearchParamState",
              "heading": "usesearchparamstate"
            }
          ],
          "title": "router",
          "group": {
            "path": "/router",
            "title": "Router"
          }
        },
        "title": "router"
      },
      {
        "path": "/script/changelog",
        "component": require('../../packages/script/CHANGELOG.md').default,
        "exact": true,
        "meta": {
          "filePath": "packages/script/CHANGELOG.md",
          "updatedTime": 1598942494000,
          "slugs": [
            {
              "depth": 1,
              "value": "Change Log",
              "heading": "change-log"
            },
            {
              "depth": 2,
              "value": "1.0.2 (2020-09-01)",
              "heading": "102-2020-09-01"
            },
            {
              "depth": 2,
              "value": "1.0.1 (2020-03-23)",
              "heading": "101-2020-03-23"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes"
            },
            {
              "depth": 1,
              "value": "1.0.0 (2020-03-14)",
              "heading": "100-2020-03-14"
            },
            {
              "depth": 2,
              "value": "0.9.3 (2020-03-13)",
              "heading": "093-2020-03-13"
            },
            {
              "depth": 2,
              "value": "0.9.2 (2020-03-07)",
              "heading": "092-2020-03-07"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes-1"
            },
            {
              "depth": 2,
              "value": "0.9.1 (2020-03-02)",
              "heading": "091-2020-03-02"
            },
            {
              "depth": 1,
              "value": "0.9.0 (2020-02-25)",
              "heading": "090-2020-02-25"
            },
            {
              "depth": 3,
              "value": "Features",
              "heading": "features"
            }
          ],
          "title": "Change Log",
          "group": {
            "path": "/script",
            "title": "Script"
          }
        },
        "title": "Change Log"
      },
      {
        "path": "/script",
        "component": require('../../packages/script/README.md').default,
        "exact": true,
        "meta": {
          "filePath": "packages/script/README.md",
          "updatedTime": 1603783066000,
          "slugs": [
            {
              "depth": 1,
              "value": "script",
              "heading": "script"
            },
            {
              "depth": 2,
              "value": "useScript",
              "heading": "usescript"
            },
            {
              "depth": 2,
              "value": "useScriptSuspense",
              "heading": "usescriptsuspense"
            }
          ],
          "title": "script",
          "group": {
            "path": "/script",
            "title": "Script"
          }
        },
        "title": "script"
      },
      {
        "path": "/scroll-into-view/changelog",
        "component": require('../../packages/scroll-into-view/CHANGELOG.md').default,
        "exact": true,
        "meta": {
          "filePath": "packages/scroll-into-view/CHANGELOG.md",
          "updatedTime": 1598942494000,
          "slugs": [
            {
              "depth": 1,
              "value": "Change Log",
              "heading": "change-log"
            },
            {
              "depth": 2,
              "value": "1.0.2 (2020-09-01)",
              "heading": "102-2020-09-01"
            },
            {
              "depth": 2,
              "value": "1.0.1 (2020-03-23)",
              "heading": "101-2020-03-23"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes"
            },
            {
              "depth": 1,
              "value": "1.0.0 (2020-03-14)",
              "heading": "100-2020-03-14"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes-1"
            },
            {
              "depth": 2,
              "value": "0.10.3 (2020-03-13)",
              "heading": "0103-2020-03-13"
            },
            {
              "depth": 2,
              "value": "0.10.2 (2020-03-07)",
              "heading": "0102-2020-03-07"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes-2"
            },
            {
              "depth": 2,
              "value": "0.10.1 (2020-03-02)",
              "heading": "0101-2020-03-02"
            },
            {
              "depth": 1,
              "value": "0.10.0 (2020-02-27)",
              "heading": "0100-2020-02-27"
            },
            {
              "depth": 3,
              "value": "Features",
              "heading": "features"
            },
            {
              "depth": 1,
              "value": "0.9.0 (2020-02-25)",
              "heading": "090-2020-02-25"
            },
            {
              "depth": 3,
              "value": "Features",
              "heading": "features-1"
            }
          ],
          "title": "Change Log",
          "group": {
            "path": "/scroll-into-view",
            "title": "Scroll-into-view"
          }
        },
        "title": "Change Log"
      },
      {
        "path": "/scroll-into-view",
        "component": require('../../packages/scroll-into-view/README.md').default,
        "exact": true,
        "meta": {
          "filePath": "packages/scroll-into-view/README.md",
          "updatedTime": 1603783066000,
          "slugs": [
            {
              "depth": 1,
              "value": "scroll-into-view",
              "heading": "scroll-into-view"
            },
            {
              "depth": 2,
              "value": "useScrollIntoView",
              "heading": "usescrollintoview"
            }
          ],
          "title": "scroll-into-view",
          "group": {
            "path": "/scroll-into-view",
            "title": "Scroll-into-view"
          }
        },
        "title": "scroll-into-view"
      },
      {
        "path": "/scroll-lock/changelog",
        "component": require('../../packages/scroll-lock/CHANGELOG.md').default,
        "exact": true,
        "meta": {
          "filePath": "packages/scroll-lock/CHANGELOG.md",
          "updatedTime": 1598942494000,
          "slugs": [
            {
              "depth": 1,
              "value": "Change Log",
              "heading": "change-log"
            },
            {
              "depth": 2,
              "value": "1.0.2 (2020-09-01)",
              "heading": "102-2020-09-01"
            },
            {
              "depth": 2,
              "value": "1.0.1 (2020-03-23)",
              "heading": "101-2020-03-23"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes"
            },
            {
              "depth": 1,
              "value": "1.0.0 (2020-03-14)",
              "heading": "100-2020-03-14"
            },
            {
              "depth": 2,
              "value": "0.9.1 (2020-03-13)",
              "heading": "091-2020-03-13"
            },
            {
              "depth": 1,
              "value": "0.9.0 (2020-03-07)",
              "heading": "090-2020-03-07"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes-1"
            },
            {
              "depth": 3,
              "value": "Features",
              "heading": "features"
            }
          ],
          "title": "Change Log",
          "group": {
            "path": "/scroll-lock",
            "title": "Scroll-lock"
          }
        },
        "title": "Change Log"
      },
      {
        "path": "/scroll-lock",
        "component": require('../../packages/scroll-lock/README.md').default,
        "exact": true,
        "meta": {
          "filePath": "packages/scroll-lock/README.md",
          "updatedTime": 1603783066000,
          "slugs": [
            {
              "depth": 1,
              "value": "scroll-lock",
              "heading": "scroll-lock"
            },
            {
              "depth": 2,
              "value": "useScrollLock",
              "heading": "usescrolllock"
            }
          ],
          "title": "scroll-lock",
          "group": {
            "path": "/scroll-lock",
            "title": "Scroll-lock"
          }
        },
        "title": "scroll-lock"
      },
      {
        "path": "/scroll-position/changelog",
        "component": require('../../packages/scroll-position/CHANGELOG.md').default,
        "exact": true,
        "meta": {
          "filePath": "packages/scroll-position/CHANGELOG.md",
          "updatedTime": 1598942494000,
          "slugs": [
            {
              "depth": 1,
              "value": "Change Log",
              "heading": "change-log"
            },
            {
              "depth": 2,
              "value": "1.0.3 (2020-09-01)",
              "heading": "103-2020-09-01"
            },
            {
              "depth": 2,
              "value": "1.0.2 (2020-05-03)",
              "heading": "102-2020-05-03"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes"
            },
            {
              "depth": 2,
              "value": "1.0.1 (2020-03-23)",
              "heading": "101-2020-03-23"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes-1"
            },
            {
              "depth": 1,
              "value": "1.0.0 (2020-03-14)",
              "heading": "100-2020-03-14"
            },
            {
              "depth": 2,
              "value": "0.9.2 (2020-03-13)",
              "heading": "092-2020-03-13"
            },
            {
              "depth": 2,
              "value": "0.9.1 (2020-03-07)",
              "heading": "091-2020-03-07"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes-2"
            },
            {
              "depth": 1,
              "value": "0.9.0 (2020-03-02)",
              "heading": "090-2020-03-02"
            },
            {
              "depth": 3,
              "value": "Features",
              "heading": "features"
            }
          ],
          "title": "Change Log",
          "group": {
            "path": "/scroll-position",
            "title": "Scroll-position"
          }
        },
        "title": "Change Log"
      },
      {
        "path": "/scroll-position",
        "component": require('../../packages/scroll-position/README.md').default,
        "exact": true,
        "meta": {
          "filePath": "packages/scroll-position/README.md",
          "updatedTime": 1603783066000,
          "slugs": [
            {
              "depth": 1,
              "value": "scroll-position",
              "heading": "scroll-position"
            },
            {
              "depth": 2,
              "value": "useScrollPosition",
              "heading": "usescrollposition"
            },
            {
              "depth": 2,
              "value": "useScrollLeft",
              "heading": "usescrollleft"
            },
            {
              "depth": 2,
              "value": "useScrollTop",
              "heading": "usescrolltop"
            }
          ],
          "title": "scroll-position",
          "group": {
            "path": "/scroll-position",
            "title": "Scroll-position"
          }
        },
        "title": "scroll-position"
      },
      {
        "path": "/selection/changelog",
        "component": require('../../packages/selection/CHANGELOG.md').default,
        "exact": true,
        "meta": {
          "filePath": "packages/selection/CHANGELOG.md",
          "updatedTime": 1598942494000,
          "slugs": [
            {
              "depth": 1,
              "value": "Change Log",
              "heading": "change-log"
            },
            {
              "depth": 2,
              "value": "1.0.3 (2020-09-01)",
              "heading": "103-2020-09-01"
            },
            {
              "depth": 2,
              "value": "1.0.2 (2020-03-31)",
              "heading": "102-2020-03-31"
            },
            {
              "depth": 2,
              "value": "1.0.1 (2020-03-23)",
              "heading": "101-2020-03-23"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes"
            },
            {
              "depth": 1,
              "value": "1.0.0 (2020-03-14)",
              "heading": "100-2020-03-14"
            },
            {
              "depth": 2,
              "value": "0.9.3 (2020-03-13)",
              "heading": "093-2020-03-13"
            },
            {
              "depth": 2,
              "value": "0.9.2 (2020-03-07)",
              "heading": "092-2020-03-07"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes-1"
            },
            {
              "depth": 2,
              "value": "0.9.1 (2020-03-02)",
              "heading": "091-2020-03-02"
            },
            {
              "depth": 1,
              "value": "0.9.0 (2020-02-25)",
              "heading": "090-2020-02-25"
            },
            {
              "depth": 3,
              "value": "Features",
              "heading": "features"
            }
          ],
          "title": "Change Log",
          "group": {
            "path": "/selection",
            "title": "Selection"
          }
        },
        "title": "Change Log"
      },
      {
        "path": "/selection",
        "component": require('../../packages/selection/README.md').default,
        "exact": true,
        "meta": {
          "filePath": "packages/selection/README.md",
          "updatedTime": 1603783066000,
          "slugs": [
            {
              "depth": 1,
              "value": "selection",
              "heading": "selection"
            },
            {
              "depth": 2,
              "value": "useSelection",
              "heading": "useselection"
            }
          ],
          "title": "selection",
          "group": {
            "path": "/selection",
            "title": "Selection"
          }
        },
        "title": "selection"
      },
      {
        "path": "/snapshot/changelog",
        "component": require('../../packages/snapshot/CHANGELOG.md').default,
        "exact": true,
        "meta": {
          "filePath": "packages/snapshot/CHANGELOG.md",
          "updatedTime": 1598942494000,
          "slugs": [
            {
              "depth": 1,
              "value": "Change Log",
              "heading": "change-log"
            },
            {
              "depth": 2,
              "value": "1.0.2 (2020-09-01)",
              "heading": "102-2020-09-01"
            },
            {
              "depth": 2,
              "value": "1.0.1 (2020-03-23)",
              "heading": "101-2020-03-23"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes"
            },
            {
              "depth": 1,
              "value": "1.0.0 (2020-03-14)",
              "heading": "100-2020-03-14"
            },
            {
              "depth": 2,
              "value": "0.9.1 (2020-03-13)",
              "heading": "091-2020-03-13"
            },
            {
              "depth": 1,
              "value": "0.9.0 (2020-03-07)",
              "heading": "090-2020-03-07"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes-1"
            },
            {
              "depth": 3,
              "value": "Features",
              "heading": "features"
            }
          ],
          "title": "Change Log",
          "group": {
            "path": "/snapshot",
            "title": "Snapshot"
          }
        },
        "title": "Change Log"
      },
      {
        "path": "/snapshot",
        "component": require('../../packages/snapshot/README.md').default,
        "exact": true,
        "meta": {
          "filePath": "packages/snapshot/README.md",
          "updatedTime": 1603783066000,
          "slugs": [
            {
              "depth": 1,
              "value": "snapshot",
              "heading": "snapshot"
            },
            {
              "depth": 2,
              "value": "useSnapshotState",
              "heading": "usesnapshotstate"
            }
          ],
          "title": "snapshot",
          "group": {
            "path": "/snapshot",
            "title": "Snapshot"
          }
        },
        "title": "snapshot"
      },
      {
        "path": "/timeout/changelog",
        "component": require('../../packages/timeout/CHANGELOG.md').default,
        "exact": true,
        "meta": {
          "filePath": "packages/timeout/CHANGELOG.md",
          "updatedTime": 1598942494000,
          "slugs": [
            {
              "depth": 1,
              "value": "Change Log",
              "heading": "change-log"
            },
            {
              "depth": 2,
              "value": "1.0.2 (2020-09-01)",
              "heading": "102-2020-09-01"
            },
            {
              "depth": 2,
              "value": "1.0.1 (2020-03-23)",
              "heading": "101-2020-03-23"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes"
            },
            {
              "depth": 1,
              "value": "1.0.0 (2020-03-14)",
              "heading": "100-2020-03-14"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes-1"
            },
            {
              "depth": 2,
              "value": "0.9.4 (2020-03-13)",
              "heading": "094-2020-03-13"
            },
            {
              "depth": 2,
              "value": "0.9.3 (2020-03-07)",
              "heading": "093-2020-03-07"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes-2"
            },
            {
              "depth": 2,
              "value": "0.9.2 (2020-03-02)",
              "heading": "092-2020-03-02"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes-3"
            },
            {
              "depth": 2,
              "value": "0.9.1 (2020-02-25)",
              "heading": "091-2020-02-25"
            },
            {
              "depth": 1,
              "value": "0.9.0 (2020-02-23)",
              "heading": "090-2020-02-23"
            },
            {
              "depth": 3,
              "value": "Features",
              "heading": "features"
            }
          ],
          "title": "Change Log",
          "group": {
            "path": "/timeout",
            "title": "Timeout"
          }
        },
        "title": "Change Log"
      },
      {
        "path": "/timeout",
        "component": require('../../packages/timeout/README.md').default,
        "exact": true,
        "meta": {
          "filePath": "packages/timeout/README.md",
          "updatedTime": 1603783066000,
          "slugs": [
            {
              "depth": 1,
              "value": "timeout",
              "heading": "timeout"
            },
            {
              "depth": 2,
              "value": "useTimeout",
              "heading": "usetimeout"
            },
            {
              "depth": 2,
              "value": "useInterval",
              "heading": "useinterval"
            },
            {
              "depth": 2,
              "value": "useStableInterval",
              "heading": "usestableinterval"
            }
          ],
          "title": "timeout",
          "group": {
            "path": "/timeout",
            "title": "Timeout"
          }
        },
        "title": "timeout"
      },
      {
        "path": "/transition-state/changelog",
        "component": require('../../packages/transition-state/CHANGELOG.md').default,
        "exact": true,
        "meta": {
          "filePath": "packages/transition-state/CHANGELOG.md",
          "updatedTime": 1598942494000,
          "slugs": [
            {
              "depth": 1,
              "value": "Change Log",
              "heading": "change-log"
            },
            {
              "depth": 2,
              "value": "1.0.2 (2020-09-01)",
              "heading": "102-2020-09-01"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes"
            },
            {
              "depth": 2,
              "value": "1.0.1 (2020-03-23)",
              "heading": "101-2020-03-23"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes-1"
            },
            {
              "depth": 1,
              "value": "1.0.0 (2020-03-14)",
              "heading": "100-2020-03-14"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes-2"
            },
            {
              "depth": 2,
              "value": "0.9.1 (2020-03-13)",
              "heading": "091-2020-03-13"
            },
            {
              "depth": 1,
              "value": "0.9.0 (2020-03-07)",
              "heading": "090-2020-03-07"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes-3"
            },
            {
              "depth": 3,
              "value": "Features",
              "heading": "features"
            }
          ],
          "title": "Change Log",
          "group": {
            "path": "/transition-state",
            "title": "Transition-state"
          }
        },
        "title": "Change Log"
      },
      {
        "path": "/transition-state",
        "component": require('../../packages/transition-state/README.md').default,
        "exact": true,
        "meta": {
          "filePath": "packages/transition-state/README.md",
          "updatedTime": 1603783066000,
          "slugs": [
            {
              "depth": 1,
              "value": "transition-state",
              "heading": "transition-state"
            },
            {
              "depth": 2,
              "value": "useTransitionState",
              "heading": "usetransitionstate"
            }
          ],
          "title": "transition-state",
          "group": {
            "path": "/transition-state",
            "title": "Transition-state"
          }
        },
        "title": "transition-state"
      },
      {
        "path": "/update/changelog",
        "component": require('../../packages/update/CHANGELOG.md').default,
        "exact": true,
        "meta": {
          "filePath": "packages/update/CHANGELOG.md",
          "updatedTime": 1598942494000,
          "slugs": [
            {
              "depth": 1,
              "value": "Change Log",
              "heading": "change-log"
            },
            {
              "depth": 2,
              "value": "1.0.2 (2020-09-01)",
              "heading": "102-2020-09-01"
            },
            {
              "depth": 2,
              "value": "1.0.1 (2020-03-23)",
              "heading": "101-2020-03-23"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes"
            },
            {
              "depth": 1,
              "value": "1.0.0 (2020-03-14)",
              "heading": "100-2020-03-14"
            },
            {
              "depth": 2,
              "value": "0.9.4 (2020-03-13)",
              "heading": "094-2020-03-13"
            },
            {
              "depth": 2,
              "value": "0.9.3 (2020-03-07)",
              "heading": "093-2020-03-07"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes-1"
            },
            {
              "depth": 2,
              "value": "0.9.2 (2020-03-02)",
              "heading": "092-2020-03-02"
            },
            {
              "depth": 2,
              "value": "0.9.1 (2020-02-25)",
              "heading": "091-2020-02-25"
            },
            {
              "depth": 1,
              "value": "0.9.0 (2020-02-14)",
              "heading": "090-2020-02-14"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes-2"
            },
            {
              "depth": 3,
              "value": "Features",
              "heading": "features"
            }
          ],
          "title": "Change Log",
          "group": {
            "path": "/update",
            "title": "Update"
          }
        },
        "title": "Change Log"
      },
      {
        "path": "/update",
        "component": require('../../packages/update/README.md').default,
        "exact": true,
        "meta": {
          "filePath": "packages/update/README.md",
          "updatedTime": 1603783066000,
          "slugs": [
            {
              "depth": 1,
              "value": "update",
              "heading": "update"
            },
            {
              "depth": 2,
              "value": "useForceupdate",
              "heading": "useforceupdate"
            }
          ],
          "title": "update",
          "group": {
            "path": "/update",
            "title": "Update"
          }
        },
        "title": "update"
      },
      {
        "path": "/user-media/changelog",
        "component": require('../../packages/user-media/CHANGELOG.md').default,
        "exact": true,
        "meta": {
          "filePath": "packages/user-media/CHANGELOG.md",
          "updatedTime": 1598942494000,
          "slugs": [
            {
              "depth": 1,
              "value": "Change Log",
              "heading": "change-log"
            },
            {
              "depth": 2,
              "value": "0.9.1 (2020-09-01)",
              "heading": "091-2020-09-01"
            },
            {
              "depth": 1,
              "value": "0.9.0 (2020-04-21)",
              "heading": "090-2020-04-21"
            },
            {
              "depth": 3,
              "value": "Features",
              "heading": "features"
            }
          ],
          "title": "Change Log",
          "group": {
            "path": "/user-media",
            "title": "User-media"
          }
        },
        "title": "Change Log"
      },
      {
        "path": "/user-media",
        "component": require('../../packages/user-media/README.md').default,
        "exact": true,
        "meta": {
          "filePath": "packages/user-media/README.md",
          "updatedTime": 1603783066000,
          "slugs": [
            {
              "depth": 1,
              "value": "user-media",
              "heading": "user-media"
            },
            {
              "depth": 2,
              "value": "useUserMedia",
              "heading": "useusermedia"
            }
          ],
          "title": "user-media",
          "group": {
            "path": "/user-media",
            "title": "User-media"
          }
        },
        "title": "user-media"
      },
      {
        "path": "/web-socket/changelog",
        "component": require('../../packages/web-socket/CHANGELOG.md').default,
        "exact": true,
        "meta": {
          "filePath": "packages/web-socket/CHANGELOG.md",
          "updatedTime": 1598942494000,
          "slugs": [
            {
              "depth": 1,
              "value": "Change Log",
              "heading": "change-log"
            },
            {
              "depth": 2,
              "value": "0.9.1 (2020-09-01)",
              "heading": "091-2020-09-01"
            },
            {
              "depth": 1,
              "value": "0.9.0 (2020-05-22)",
              "heading": "090-2020-05-22"
            },
            {
              "depth": 3,
              "value": "Features",
              "heading": "features"
            }
          ],
          "title": "Change Log",
          "group": {
            "path": "/web-socket",
            "title": "Web-socket"
          }
        },
        "title": "Change Log"
      },
      {
        "path": "/web-socket",
        "component": require('../../packages/web-socket/README.md').default,
        "exact": true,
        "meta": {
          "filePath": "packages/web-socket/README.md",
          "updatedTime": 1603783066000,
          "slugs": [
            {
              "depth": 1,
              "value": "web-socket",
              "heading": "web-socket"
            },
            {
              "depth": 2,
              "value": "useWebSocket",
              "heading": "usewebsocket"
            }
          ],
          "title": "web-socket",
          "group": {
            "path": "/web-socket",
            "title": "Web-socket"
          }
        },
        "title": "web-socket"
      },
      {
        "path": "/window-size/changelog",
        "component": require('../../packages/window-size/CHANGELOG.md').default,
        "exact": true,
        "meta": {
          "filePath": "packages/window-size/CHANGELOG.md",
          "updatedTime": 1598942494000,
          "slugs": [
            {
              "depth": 1,
              "value": "Change Log",
              "heading": "change-log"
            },
            {
              "depth": 2,
              "value": "1.0.3 (2020-09-01)",
              "heading": "103-2020-09-01"
            },
            {
              "depth": 2,
              "value": "1.0.2 (2020-05-22)",
              "heading": "102-2020-05-22"
            },
            {
              "depth": 2,
              "value": "1.0.1 (2020-03-23)",
              "heading": "101-2020-03-23"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes"
            },
            {
              "depth": 1,
              "value": "1.0.0 (2020-03-14)",
              "heading": "100-2020-03-14"
            },
            {
              "depth": 2,
              "value": "0.9.4 (2020-03-13)",
              "heading": "094-2020-03-13"
            },
            {
              "depth": 2,
              "value": "0.9.3 (2020-03-07)",
              "heading": "093-2020-03-07"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes-1"
            },
            {
              "depth": 2,
              "value": "0.9.2 (2020-03-02)",
              "heading": "092-2020-03-02"
            },
            {
              "depth": 2,
              "value": "0.9.1 (2020-02-25)",
              "heading": "091-2020-02-25"
            },
            {
              "depth": 1,
              "value": "0.9.0 (2020-02-14)",
              "heading": "090-2020-02-14"
            },
            {
              "depth": 3,
              "value": "Bug Fixes",
              "heading": "bug-fixes-2"
            },
            {
              "depth": 3,
              "value": "Features",
              "heading": "features"
            }
          ],
          "title": "Change Log",
          "group": {
            "path": "/window-size",
            "title": "Window-size"
          }
        },
        "title": "Change Log"
      },
      {
        "path": "/window-size",
        "component": require('../../packages/window-size/README.md').default,
        "exact": true,
        "meta": {
          "filePath": "packages/window-size/README.md",
          "updatedTime": 1603783066000,
          "slugs": [
            {
              "depth": 1,
              "value": "window-size",
              "heading": "window-size"
            },
            {
              "depth": 2,
              "value": "useWindowSize",
              "heading": "usewindowsize"
            }
          ],
          "title": "window-size",
          "group": {
            "path": "/window-size",
            "title": "Window-size"
          }
        },
        "title": "window-size"
      }
    ],
    "title": "@huse/core"
  }
];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}

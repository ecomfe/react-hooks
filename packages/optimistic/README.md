---
title: README
nav:
  title: Hooks
  path: /hook
group:
  title: Optimistic
  path: /optimistic
order: 1
---

# Optimistic

Provides a set of react hooks to help manage optimistic states.

As previously stated in [redux-optimistic-thunk](https://github.com/ecomfe/redux-optimistic-thunk#why-this-middleware),
manually managing optimistic states, commits, rollbacks and transactions is not ideal model of state management.
React hooks provide powers to manage states in a more functional way, and this library aimed to build optimistic functions above hooks.

**This library requires [ES6 Generators](https://caniuse.com/#feat=es6-generators) to work.**
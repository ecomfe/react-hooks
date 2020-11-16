---
title: useScrollIntoView
nav:
  title: Hooks
  path: /hook
group:
  title: Scroll Into View
  path: /scroll-into-view
order: 2
---

# useScrollIntoView

To make an active element scroll into view on its mount.

```typescript
function useScrollIntoView(
    ref: RefObject<HTMLElement>,
    active: boolean = true,
    options: boolean | ScrollIntoViewOptions = {behavior: 'smooth'}
): void
```

This hook conforms to `scrollIntoView` function on `HTMLElement`, the `active` argument controls whether scroll should be performed.

It is recommended to have only one active element performing scroll.

```javascript
const App = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div>
            <div className={c.header}>
                {colors.map((c, i) => <Anchor key={c.color} {...c} onClick={() => setActiveIndex(i)} />)}
            </div>
            {colors.map((c, i) => <Block key={c.color} {...c} activeInView={i === activeIndex} />)}
        </div>
    );
};
```

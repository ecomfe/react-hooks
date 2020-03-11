# @huse/media

Provides hooks to observe media query matches.

## useMedia

Observe the given media query and return whether it is satisfied by current environment.

```typescript
function useMedia(query: string): boolean;
```

The return value is responsive to viewport and device changes.

```jsx
import {useMedia} from '@huse/media';

const App = () => {
    const isMobile = useMedia('only screen and (min-device-width : 320px) and (max-device-width : 480px)');
    const isPad = useMedia('only screen and (min-device-width : 768px) and (max-device-width : 1024px)');
    const isDesktop = useMedia('only screen and (min-width : 1224px)');
    const deviceType = (() => {
        if (isMobile) {
            return 'Mobile';
        }
        if (isPad) {
            return 'Pad';
        }
        if (isDesktop) {
            return 'Desektop';
        }
        return 'Others';
    })();

    return (
        <p>
            You device: {deviceType}
        </p>
    );
};
```

## usePreferDarkMode

A shortcut hook to determine whether current user prefers dark mode.

```typescript
function usePreferDarkMode(): boolean;
```

This hook is also response, that means the value will be updated if system changes color scheme or having a automatic scheme.

```jsx
import {usePreferDarkMode} from '@huse/media';

const App = () => {
    const darkMode = usePreferDarkMode();
    const backgroundColor = darkMode ? '#222' : '#fff';
    const color = darkMode ? '#f5f6f7' : '#666';

    return (
        <div style={{color, backgroundColor, height: 60, lineHeight: '60px', textAlign: 'center', fontSize: 30}}>
            Good {darkMode ? 'Evening' : 'Morning'}
        </div>
    );
};
```

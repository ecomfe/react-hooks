# 项目结构

项目基于`yarn`来构建基本的工作环境，每一个hook都在`packages`目录文件夹下，使用`xx-xx`破折号分割, 没有使用`use`前缀，


包名要确保是`@huse/foo-bar`这种格式的

```bash

packages
│   ├── action-pending
│   ├── window-size
│   ├── foo-bar
│   └── xxx-xxx

```

要注意每一个包的导出和命名规范 , 使用时如下示例:

```js
import { useInputValue } from '@huse/input-value';
```

## 单元测试
我们推荐你使用单元测试，可以把单元测试文件放在`src/__tests__`文件夹下，以`.test.js`来结尾命名，我们强烈建议你的单测覆盖率要达到100%。
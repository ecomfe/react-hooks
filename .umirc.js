const fillPrefix = filePath => {
    const prefix = process.env.NODE_ENV === 'production' ? '/react-hooks/' : '/';
    return typeof filePath === 'string' ? prefix + filePath : '';
};

export default {
    mode: 'site',
    title: 'huse',
    // favicon: '/simple-logo.svg',
    logo: fillPrefix('huse.svg'),
    links: [{rel: 'stylesheet', href: fillPrefix('style.css')}],
    // hash: true,
    resolve: {
        includes: ['docs', 'packages'],
    },
    history: {
        type: 'browser',
    },
    publicPath: process.env.CI ? '/react-hooks/' : '/',
    // extraBabelPlugins: [
    //     [
    //         'babel-plugin-import',
    //         {
    //             libraryName: 'antd',
    //             libraryDirectory: 'es',
    //             style: true,
    //         },
    //         'antd',
    //     ],
    //     [
    //         'babel-plugin-import',
    //         {
    //             libraryName: '@alifd/next',
    //             style: false,
    //         },
    //         'fusion',
    //     ],
    // ],
    locales: [
        ['en-US', 'English'],
        ['zh-CN', '中文'],
    ],
    navs: {
        'zh-CN': [null, {title: 'GitHub', path: 'https://github.com/ecomfe/react-hooks'}],
        'en-US': [null, {title: 'GitHub', path: 'https://github.com/ecomfe/react-hooks'}],
    },
};

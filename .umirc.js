export default {
    mode: 'site',
    title: '@huse/core',
    // favicon: '/simple-logo.svg',
    // logo: '/logo.svg',
    // hash: true,
    resolve: {
        includes: ['packages'],
    },
    history: {
        type: 'hash',
    },
    publicPath: process.env.CI ? '/react-hooks/' : '/',
    extraBabelPlugins: [
        [
            'babel-plugin-import',
            {
                libraryName: 'antd',
                libraryDirectory: 'es',
                style: true,
            },
            'antd',
        ],
        [
            'babel-plugin-import',
            {
                libraryName: '@alifd/next',
                style: false,
            },
            'fusion',
        ],
    ],
    navs: {
        'zh-CN': [
            null
        ],
        'en-US': [
            null
        ],
    },
};
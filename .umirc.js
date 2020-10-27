export default {
    resolve: {
        includes: ['packages'],
    },
    history: {
        type: 'hash',
    },
    publicPath: process.env.CI ? '/react-hooks/' : '/',
};

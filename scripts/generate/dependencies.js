const plain = require('../../packages/boolean/package.json');
const dom = require('../../packages/click-outside/package.json');
const demo = require('../../packages/element-size/package.json');

const dependencies = Object.assign(
    {},
    plain.dependencies,
    plain.devDependencies,
    dom.dependencies,
    dom.devDependencies,
    demo.dependencies,
    demo.devDependencies
);

module.exports = name => {
    const version = dependencies[name];

    if (!version) {
        throw new Error(`Cannot find a suitable version for ${name}`);
    }

    return version;
};

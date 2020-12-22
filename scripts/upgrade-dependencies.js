const {readFileSync, writeFileSync} = require('fs');
const {execSync} = require('child_process');
const {sync: glob} = require('glob');
const {escapeRegExp} = require('lodash');

const VERSION_CACHE = {};

const latestVersion = (packageName, tag = 'latest') => {
    const identifier = `${packageName}@${tag}`;

    if (VERSION_CACHE[identifier]) {
        return VERSION_CACHE[identifier];
    }

    const output = execSync(`npm info ${identifier} version`);
    const version = output.toString().trim();
    VERSION_CACHE[identifier] = version;
    return version;
};

const replaceVersion = (content, packageName, tag) => {
    const version = latestVersion(packageName, tag);
    return content.replace(
        new RegExp(`"${escapeRegExp(packageName)}": "[^"]+"`),
        `"${packageName}": "^${version}"`
    );
};

const UPDATES = [
    ['@reskript/cli', 'next'],
    ['@reskript/cli-dev', 'next'],
    ['@reskript/cli-lint', 'next'],
    ['@reskript/cli-test', 'next'],
    ['@reskript/config-lint', 'next'],
    ['typescript'],
    ['eslint'],
    ['stylelint'],
    ['webpack'],
    ['antd'],
    ['@testing-library/react-hooks'],
    ['@testing-library/react'],
    ['@types/react'],
];

for (const file of glob('packages/*/package.json')) {
    const content = readFileSync(file, 'utf-8');
    const updated = UPDATES.reduce(
        (content, [packageName, tag]) => replaceVersion(content, packageName, tag),
        content
    );
    writeFileSync(file, updated);
}

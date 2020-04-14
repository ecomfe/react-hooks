const path = require('path');
const fs = require('fs-extra');
const {produce} = require('immer');
const sortPackageJSON = require('sort-package-json');
const prompt = require('./prompt');
const findDependencyVersion = require('./dependencies');
const writeTemplate = require('./template');

const BASE_PACKAGE_INFO = {
    version: '0.8.0',
    main: 'cjs/index.js',
    module: 'es/index.js',
    types: 'es/index.d.ts',
    keywords: ['react', 'hooks'],
    bugs: {
        url: 'https://github.com/ecomfe/react-hooks/issues',
    },
    license: 'MIT',
    files: ['cjs', 'es', 'src'],
    publishConfig: {
        access: 'public',
        registry: 'https://registry.npmjs.com',
    },
    scripts: {
        lint: 'skr lint',
        build: 'rm -rf es cjs && tsc & tsc --module ESNext --outDir ./es',
        'build-check': 'tsc',
    },
    devDependencies: {},
    peerDependencies: {
        react: '^16.8.0',
    },
};

const main = async () => {
    const answers = await prompt();

    const to = filename => path.join(__dirname, '..', '..', 'packages', answers.packageName, filename);

    await fs.ensureDir(to(''));

    const packageInfo = produce(
        BASE_PACKAGE_INFO,
        info => {
            const addDevDependency = name => (info.devDependencies[name] = findDependencyVersion(name));

            info.name = `@huse/${answers.packageName}`;
            info.homepage = `https://github.com/ecomfe/react-hooks/tree/master/packages/${answers.packageName}`;
            addDevDependency('react');
            addDevDependency('@types/react');
            addDevDependency('typescript');
            addDevDependency('reskript');
            if (answers.hookTest) {
                info.scripts.test = 'skr test --coverage';
            }
            else if (answers.domTest) {
                info.scripts.test = 'skr test --coverage --target=react';
            }
            else {
                info.scripts.test = `echo 'No test in @huse/${answers.packageName}'`;
            }

            if (answers.hookTest) {
                addDevDependency('@testing-library/react-hooks');
            }
            if (answers.domTest) {
                addDevDependency('@testing-library/react');
                addDevDependency('enzyme');
            }
            if (answers.demo) {
                addDevDependency('react-dom');
                addDevDependency('webpack');
                addDevDependency('classnames');
                info.scripts.start = 'skr dev --src=demo';
            }
        }
    );
    await fs.writeFile(to('package.json'), JSON.stringify(sortPackageJSON(packageInfo), null, '  ') + '\n');
    await fs.ensureDir(to('src'));
    await writeTemplate('index', to('src/index.ts'), answers);
    await writeTemplate('eslint', to('.eslintrc.js'), answers);
    await writeTemplate('tsconfig', to('tsconfig.json', answers));
    await writeTemplate('readme', to('README.md'), answers);
    if (answers.hookTest) {
        await writeTemplate('test-hook', to('src/__tests__/index.test.js'), answers);
    }
    if (answers.domTest) {
        await writeTemplate('test-dom', to('src/__tests__/index.test.js'), answers);
    }
    if (answers.demo) {
        await writeTemplate('demo', to('demo/entries/index.js'), answers);
    }

    // eslint-disable-next-line no-console
    console.log(`created packages/${answers.packageName}`);
};

main();

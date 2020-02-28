const inquirer = require('inquirer');

const questions = [
    {
        type: 'input',
        name: 'packageName',
        message: 'package name:',
        transformer(name) {
            return `@huse/${name}`;
        },
        validate(name) {
            return name.length > 1;
        },
    },
    {
        type: 'confirm',
        name: 'hookTest',
        message: 'test with hook support:',
    },
    {
        type: 'confirm',
        name: 'domTest',
        message: 'test with DOM support:',
    },
    {
        type: 'confirm',
        name: 'demo',
        message: 'has demo:',
        default: false,
    },
    {
        type: 'input',
        name: 'hookName',
        message: 'initial hook name:',
        validate(name) {
            return name.length > 3 && name.startsWith('use');
        },
    },
];

module.exports = () => inquirer.prompt(questions);

const path = require('path');
const fs = require('fs-extra');
const replace = (input, vars) => input.replace(/%(\w+)%/g, (match, name) => vars[name]);

module.exports = async (name, destination, vars) => {
    await fs.ensureFile(destination);
    const template = fs.readFileSync(path.join(__dirname, 'templates', `${name}.tpl`), 'utf-8');
    await fs.writeFile(destination, replace(template, vars));
};

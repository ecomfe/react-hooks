exports.addition = () => {
    return {
        devServer: {
            before(app) {
                const serveStaticScriptByIndex = index => (req, res) => {
                    const body = `
                        window.dynamicScripts = window.dynamicScripts || {};
                        window.dynamicScripts[${index}] = Math.random();
                    `;
                    res.contentType('.js');
                    res.end(body);
                };

                app.get('/1.js', serveStaticScriptByIndex(1));
                app.get('/2.js', serveStaticScriptByIndex(2));
                app.get('/3.js', serveStaticScriptByIndex(3));
                app.get('/4.js', serveStaticScriptByIndex(4));
            },
        },
    };
};

exports.plugins = [];

module.exports = async (app, options) => {
    app.register(require('./organizations'), {prefix: 'organizations'});
};
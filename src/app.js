const fastify = require('fastify');

const build = async (opts = {}) => {
    // Create the Fastify app
    const app = fastify(opts);

    // Register routes
    app.register(require('./routes/api'), {prefix: 'api'});

    // Return the app
    return app;
}

module.exports = build;

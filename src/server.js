const app = require('./app');

const PORT = process.env.PORT || 3000;

const options = {
    logger: {
        level: 'info',
        prettyPrint: true
    }
}

app(options).then(app => {
    app.listen(PORT, '0.0.0.0', ((err, address) => {
        if (err) {
            app.log.error(err);
            process.exit(1);
        }
    }));
});

const basicAuth = require('basic-auth');

const users = {
    admin: 'Railway',
    user: '123',
};

const basicAuthMiddleware = (req, res, next) => {
    const user = basicAuth(req);

    if (!user || !users[user.name] || users[user.name] !== user.pass) {
        res.set('WWW-Authenticate', 'Basic realm="Example"');
        return res.status(401).send('Authentication required.');
    }

    next();
};

module.exports = basicAuthMiddleware;

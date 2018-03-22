module.exports.version = (req, res, next) => {
    const config = require('../../package.json');
    res.json({
        version: config.version
    })
};

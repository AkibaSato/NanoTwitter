module.exports = (req, res, next) => {
    return !req.user;
}

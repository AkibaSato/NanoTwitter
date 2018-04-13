module.exports = (req, res, next) => {
    if (!req.user) {
      return res.redirect('/api/v1/' + req.API_TOKEN + '/login');
    };
    next();
}

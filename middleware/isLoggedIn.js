module.exports = (req, res, next) => {
    // If user is authenticated in the session, carry on.
    if (req.isAuthenticated())
        next();

    // If they aren't redirect them to the home page.
    res.redirect('/');
}

module.exports = (req, res, next) => {
    console.log("entered is logged in ")
    if (!req.user) {
      return res.redirect('/login');
    };
    console.log(" is logged in ")
    next();
}

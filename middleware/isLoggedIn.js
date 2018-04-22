module.exports = (req, res, next) => {
    console.log("entered is logged in ")
    if (!req.user) {
      console.log("not logged in")
      return res.redirect('/api/v1/' + req.API_TOKEN + '/login');
    };
    console.log(" is logged in ")
    next();
}

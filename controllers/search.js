var env = process.env.NODE_ENV || 'development';
var config = require('../config/config.json')[env]
var searchServiceURL = config.search_service

var axios = require('axios')

module.exports.search = async (req, res) => {
  try {

    var tweets = await axios.get(searchServiceURL + '/search', {
      data: { term: req.query.search }
    });

    res.render("search", { tweets: tweets.data, me: req.user });

  } catch (err) {

  }
};

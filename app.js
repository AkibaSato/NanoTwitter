const express = require('express');
const app = express();
const port = process.env.PORT || 3000
const path    = require("path");
const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }))

app.use(function (req, res, next) {
    console.log(req.body) // populated!
    next()
})
app.set('view engine', 'ejs')



// routes
app.get('/',function(req,res){
    res.render('index');
});
app.get('/login',function(req,res){
    res.render('login');
});
app.listen(port);

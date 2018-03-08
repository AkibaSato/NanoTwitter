var fs = require('fs');
var csv = require('csv');
var strings = [];

var faker = require('faker');

// var randomName = faker.name.findName(); // Rowan Nikolaus
// var randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz
// var randomCard = faker.helpers.createCard(); // random contact card containing many properties

var followers_read = fs.createReadStream('./seeds/follows.csv');
// var tweets_read = fs.createReadStream('./seeds/tweets.csv');
// var users_read = fs.createReadStream('./seeds/read.csv');

var parser = csv.parse({columns:true});

followers_read.on('readable', function() {
  while(record = parser.read()) {
    console.log(record);
  }
});






followers_read.on('error', function(err) {
  console.log(err.message);
});

followers_read.on('finish', (function() {
  console.log(strings);
}));

followers_read.pipe(parser);

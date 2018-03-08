const fs = require('fs');
const csv = require('csv');
const faker = require('faker');
const tweets = fs.createReadStream('./seeds/tweets.csv');
// var tweets_read = fs.createReadStream('./seeds/tweets.csv');
// var users_read = fs.createReadStream('./seeds/read.csv');

const parser = csv.parse({columns:true});

tweets.on('readable', function() {
  while(record = parser.read()) {

    console.log(record[0]);
  }
});






tweets.on('error', function(err) {
  console.log(err.message);
});

tweets.on('finish', (function() {
  console.log(strings);
}));

tweets.pipe(parser);

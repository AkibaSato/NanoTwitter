var redis = require("redis")
var REDIS_PORT = process.env.REDISCLOUD_URL || process.env.REDIS_PORT;
const bluebird = require('bluebird');
bluebird.promisifyAll(redis);
var client = redis.createClient(REDIS_PORT);

module.exports = client

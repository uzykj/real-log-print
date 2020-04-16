/**
 *@author xbh
 *@dateTime 2019-04-09 13:47
 *@description 临时存储
 */
var redis = require("redis");
const conf = require('../conf/redis');
var sub = redis.createClient(conf.port, conf.host);
const antiCrawl = [];

//消息订阅
sub.on("message", function (channel, message) {
    antiCrawl.push(message);
    console.log(channel + ": " + message);
});

sub.subscribe("antiCrawl");

module.exports = antiCrawl;

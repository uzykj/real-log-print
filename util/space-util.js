/**
 *@author xbh
 *@dateTime 2019-04-09 13:47
 *@description 临时存储
 */
var redis = require("./redis-util");
var sub = redis.createRedis();
const queueData = [];

//消息订阅
sub.on("message", function (channel, message) {
    const msg = JSON.parse(message);
    queueData.push(msg);
    console.log(channel + ": " + msg);
});

sub.subscribe("realLog");

module.exports = queueData;

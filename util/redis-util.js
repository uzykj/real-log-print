/**
 *@author xbh
 *@dateTime 2019-02-27 08:47
 *@description redis的基础操作，缓存失效时间单位为：秒
 */
const redis = require('redis');
const conf = require('../conf/redis');

var config = {
    RDS_PORT: conf.port,            //端口号
    RDS_HOST: conf.host,            //服务器IP
    RDS_PWD: conf.password,         //密码
    RDS_OPTS: {auth_pass: conf.password},
};

let client;
//创建连接
let createRedis = (host, port, pwd) => {
    client = redis.createClient(conf);
    client.auth(pwd != null ? pwd : config.RDS_PWD, function (err) {
        if (err) {
            console.log("认证失败：" + err);
            return err;
        } else {
            console.log("认证成功");
        }
    });
    client.on("error", function (err) {
        console.log("redis error: " + err);
    });
    return client;
};

//设置缓存
function set(key, value, exprires) {
    client.set(key, value, (err, response) => {
        if (err) {
            return err;
        } else {
            if (exprires) {
                client.expire(key, exprires);
            }
            return response;
        }
    });
}

//获取缓存
function get(key) {
    return new Promise((resolve, reject) => {
        client.get(key, (err, response) => {
            if (err) {
                reject(err);
            } else {
                resolve(response);
            }
        })
    });
}

//删除缓存
function remove(key) {
    return new Promise((resolve, reject) => {
        client.del(key, (err, response) => {
            if (err) {
                reject(err);
            } else {
                resolve(response);
            }
        })
    });
}

//关闭连接
function close() {
    return new Promise((resolve, reject) => {
        client.end(true, function (err, res) {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    })
}

//redis消息队列生产者
function consumer(tag, data) {
    client.lpush(tag, JSON.stringify(data), function (err, reply) {
        if (err) {
            console.log('lpush message error :' + err);
        } else {
            console.log('lpush message success');
        }
    });
}

module.exports = {
    set,
    get,
    remove,
    close,
    createRedis,
    consumer
};




/**
 *@author xbh
 *@dateTime 2019-04-15 14:14
 *@description
 */
const fetch = require('node-fetch');
const conf = require('../conf/resource');

const blackService = {
    black(page, size){
        let url = `${conf.url.access}/black?page=${page}&size=${size}`;
        return fetch(url);
    },
    add(id){
        let url = `${conf.url.access}/black/add?id=${id}`;
        return fetch(url);
    },
    del(id){
        let url = `${conf.url.access}/black/del?id=${id}`;
        return fetch(url);
    },
};

module.exports = blackService;

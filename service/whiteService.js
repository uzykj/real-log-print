/**
 *@author xbh
 *@dateTime 2019-04-15 14:14
 *@description
 */
const fetch = require('node-fetch');
const conf = require('../conf/resource');

const whiteService = {
    white(page, size){
        let url = `${conf.url.access}/white?page=${page}&size=${size}`;
        return fetch(url);
    },
    add(id){
        let url = `${conf.url.access}/white/add?id=${id}`;
        return fetch(url);
    },
    del(id){
        let url = `${conf.url.access}/white/del?id=${id}`;
        return fetch(url);
    },
};

module.exports = whiteService;

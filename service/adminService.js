/**
 *@author xbh
 *@dateTime 2019-04-15 14:14
 *@description
 */
const fetch = require('node-fetch');
const conf = require('../conf/resource');
const valida = require('../util/param-valida');

const adminService = {
    admin(page, size) {
        let url = `${conf.url.access}/admin?page=${page}&size=${size}`;
        return fetch(url);
    },
    add(id) {
        let url = `${conf.url.access}/admin/add?id=${id}`;
        return fetch(url);
    },
    del(id) {
        let url = `${conf.url.access}/admin/del?id=${id}`;
        return fetch(url);
    },
    pwd(pwd) {
        let url = `${conf.url.access}/admin/pwd`;
        return fetch(url, valida.option(pwd));
    },
    login(uid, password) {
        let param = {uid: uid, password: password};
        let url = `${conf.url.access}/admin/login`;
        return fetch(url, valida.option(param));
    }
};

module.exports = adminService;

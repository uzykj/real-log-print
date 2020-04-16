/**
 *@author xbh
 *@dateTime 2019-04-15 14:14
 *@description
 */

const fetch = require('node-fetch');
const conf = require('../conf/resource');
const valida = require('../util/param-valida');

const manageService = {
    manage(page, size, orderBy, orderMethod) {
        let url = `${conf.url.access}/manage?page=${page}&size=${size}&orderBy=${orderBy}&orderMethod=${orderMethod}`;
        return fetch(url);
    },
    add(account) {
        let url = `${conf.url.access}/manage/add`;
        return fetch(url, valida.option(account));
    },
    del(id) {
        let url = `${conf.url.access}/manage/del?id=${id}`;
        return fetch(url);
    },
    update(account) {
        let url = `${conf.url.access}/manage/update`;
        return fetch(url, valida.option(account));
    },
};

module.exports = manageService;

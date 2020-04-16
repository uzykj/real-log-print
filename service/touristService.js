/**
 *@author xbh
 *@dateTime 2019-04-16 08:09
 *@description
 */
const fetch = require('node-fetch');
const conf = require('../conf/resource');

const touristService = {
    tourist(page, size, orderBy, orderMethod) {
        let url = `${conf.url.access}/manage/tourist?page=${page}&size=${size}&orderBy=${orderBy}&orderMethod=${orderMethod}`;
        return fetch(url);
    },
};

module.exports = touristService;

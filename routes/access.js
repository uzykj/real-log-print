/**
 *@author xbh
 *@dateTime 2019-04-10 09:03
 *@description
 */
const express = require('express');
const router = express.Router();
const message = require('../util/space-util');

router.get('/', (req, res, next) => {
    let arr = message.concat();
    // if (message.length >= 50) message.splice(0, 30);
    arr.reverse();
    res.render('pages/access', {
        data: arr,
    });
});

router.get('/access', (req, res, next) => {
    let arr = message.concat();
    // if (message.length >= 50) message.splice(0, 30);
    arr.reverse();
    res.json({data: arr});
});
module.exports = router;

/**
 *@author xbh
 *@dateTime 2019-04-10 09:03
 *@description
 */
const express = require('express');
const router = express.Router();
const message = require('../util/space-util');

router.get('/', (req, res, next) => {
    let power = req.cookies.power;
    power = power === undefined ? false : power;
    let arr = message.concat();
    if (message.length >= 50) message.splice(0, 30);
    arr = arr.map(x => JSON.parse(x));
    arr.reverse();
    res.render('pages/access', {
        data: arr,
        power: power
    });
});

router.get('/access', (req, res, next) => {
    let power = req.cookies.power;
    power = power === undefined ? false : power;
    let arr = message.concat();
    if (message.length >= 50)message.splice(0, 30);
    arr = arr.map(x => JSON.parse(x));
    arr.reverse();
    res.json({data: arr, power: power});
});
module.exports = router;

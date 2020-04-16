/**
 *@author xbh
 *@dateTime 2019-04-15 17:21
 *@description
 */
const express = require('express');
const router = express.Router();
const touristService = require('../service/touristService');

router.get('/', (req, res, next) => {
    let page = req.query.page;
    page = page === undefined ? 1 : page;
    let size = req.query.size;
    size = size === undefined ? 10 : size;
    let orderBy = req.query.orderBy;
    orderBy = orderBy === undefined ? '' : orderBy;
    let orderMethod = req.query.orderMethod;
    orderMethod = orderMethod === undefined ? '' : orderMethod;
    let power = req.cookies.power;
    power = power === undefined ? false : power;

    touristService.tourist(page, size, orderBy, orderMethod)
        .then(resp => resp.json())
        .then(data => {
            let [[total], result] = data;
            res.render('pages/tourist', {
                list: result,
                totalCount: total.count,
                pageCount: Math.ceil(total.count / size),
                current: page,
                power: power
            })
        })
        .catch(err => res.status(500).json(err.message));
});

module.exports = router;

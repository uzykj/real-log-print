/**
 *@author xbh
 *@dateTime 2019-04-15 14:14
 *@description
 */
const express = require('express');
const router = express.Router();
const blackService = require('../service/blackService');

router.get('/', (req, res, next) => {
    let page = req.query.page;
    page = page === undefined ? 1 : page;
    let size = req.query.size;
    size = size === undefined ? 10 : size;
    let power = req.cookies.power;
    power = power === undefined ? false : power;

    blackService.black(page, size)
        .then(resp => resp.json())
        .then(data => {
            let [[total], [count], result] = data;
            res.render('pages/black', {
                list: result,
                totalCount: count.count,
                pageCount: Math.ceil(total.count / size),
                current: page,
                power: power
            })
        })
        .catch(err => res.status(500).json(err.message));
});

router.get('/add', (req, res, next) => {
    let id = req.query.id;
    blackService.add(id)
        .then(resp => resp.json()).then(data => res.json(data))
        .catch(err => res.status(500).json(err.message));
});

router.get('/del', (req, res, next) => {
    let id = req.query.id;
    blackService.del(id)
        .then(resp => resp.json()).then(data => res.json(data))
        .catch(err => res.status(500).json(err.message));
});

module.exports = router;

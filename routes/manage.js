/**
 *@author xbh
 *@dateTime 2019-04-10 15:41
 *@description
 */
const express = require('express');
const router = express.Router();
const manageService = require('../service/manageService');

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

    manageService.manage(page, size, orderBy, orderMethod)
        .then(resp => resp.json())
        .then(data => {
            let [[total], result] = data;
            res.render('pages/manage', {
                list: result,
                totalCount: total.count,
                pageCount: Math.ceil(total.count / size),
                current: page,
                power: power
            })
        })
        .catch(err => res.status(500).json(err.message));
});

router.post('/add', (req, res, next) => {
    let account = req.body;
    manageService.add(account)
        .then(resp => resp.json()).then(data => res.json(data))
        .catch(err => res.status(500).json(err.message));
});

router.get('/del', (req, res, next) => {
    let id = req.query.id;
    manageService.del(id)
        .then(resp => resp.json()).then(data => res.json(data))
        .catch(err => res.status(500).json(err.message));
});

router.post('/update', (req, res, next) => {
    let account = req.body;
    manageService.update(account)
        .then(resp => resp.json()).then(data => res.json(data))
        .catch(err => res.status(500).json(err.message));
});
module.exports = router;

/**
 *@author xbh
 *@dateTime 2019-04-15 14:14
 *@description
 */
const express = require('express');
const router = express.Router();
const adminService = require('../service/adminService');

router.get('/', (req, res, next) => {
    let page = req.query.page;
    page = page === undefined ? 1 : page;
    let size = req.query.size;
    size = size === undefined ? 10 : size;
    let power = req.cookies.power;
    power = power === undefined ? false : power;

    adminService.admin(page, size)
        .then(resp => resp.json())
        .then(data => {
            let [[total], [count], result] = data;
            res.render('pages/admin', {
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
    adminService.add(id)
        .then(resp => resp.json()).then(data => res.json(data))
        .catch(err => res.status(500).json(err.message));
});

router.get('/del', (req, res, next) => {
    let id = req.query.id;
    adminService.del(id)
        .then(resp => resp.json()).then(data => res.json(data))
        .catch(err => res.status(500).json(err.message));
});

router.post('/pwd', (req, res, next) => {
    let pwd = req.body;
    adminService.pwd(pwd)
        .then(resp => resp.json()).then(data => res.json(data))
        .catch(err => res.status(500).json(err.message));
});

router.post('/login', (req, res, next) => {
    let uid = req.body.uid;
    let password = req.body.password;
    adminService.login(uid, password)
        .then(resp => resp.json())
        .then(data => data.status ? res.cookie('power', {
            uid: uid,
            status: true
        }, {maxAge: 3600000}).json(data) : res.json(data))
        .catch(err => res.status(500).json(err.message));
});

router.get('/out', (req, res, next) => {
    let power = req.cookies.power;
    if (power) {
        res.clearCookie('power');
        res.redirect(302, '/');
    } else {
        res.redirect(302, '/');
    }
});
module.exports = router;

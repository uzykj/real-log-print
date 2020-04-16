/**
 *@author xbh
 *@dateTime 2019-04-15 14:20
 *@description
 */
const express = require('express');
const router = express.Router();

router.use('/', require('./access'));
router.use('/admin', require('./admin'));
router.use('/manage', require('./manage'));
router.use('/black', require('./black'));
router.use('/white', require('./white'));
router.use('/tourist', require('./tourist'));

module.exports = router;

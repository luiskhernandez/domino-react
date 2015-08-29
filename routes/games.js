var express = require('express');
var router = express.Router();
var _ = require('underscore');


router.get('/deal/card', function(req, res, next) {
    res.json({items: cards});
});

module.exports = router;


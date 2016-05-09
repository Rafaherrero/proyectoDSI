(() => {
    'use strict';
    module.exports = function() {
        const express = require('express');
        const router = express.Router();

        router.get('/', function(req, res) {
            req.logout();
            res.redirect('/');
        });
        return router;
    };
})();
(() => {
    'use strict';
    module.exports = function(passport) {
        const express = require('express');
        const router = express.Router();

        router.post('/', passport.authenticate('local-signup', {
            successRedirect: '/',
            failureRedirect: '/',
            failureFlash: true
        }));
        return router;
    };
})();
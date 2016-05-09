(() => {
    'use strict';

    module.exports = function(passport) {
        const express = require('express');
        const router = express.Router();

        router.get('/', function(req, res) {
            res.send('Hola mundo');
        });
        
        router.post('/', passport.authenticate('local-signup', {
            successRedirect: '/',
            failureRedirect: '/',
            failureFlash: true
        }));
        
        return router;
    };
})();
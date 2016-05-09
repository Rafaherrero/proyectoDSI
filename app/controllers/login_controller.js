(() => {
    'use strict';
    module.exports = function(passport) {
        const express = require('express');
        const router = express.Router();

        router.get('/', (req, res) => {
            if(req.user){
                res.redirect('/');
            } else {
                res.render('login', {
                    title: 'Sharis',
                    user: req.user,
                    mesageLogin: req.flash('loginMessage'),
                    path: 'login'
                });
            }
        });

        router.post('/', passport.authenticate('local-login', {
            successRedirect: '/login',
            failureRedirect: '/login',
            failureFlash: true
        }));
        return router;
    };
})();
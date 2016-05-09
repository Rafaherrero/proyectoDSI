(() => {
    'use strict';
    module.exports = function(passport) {
        const express = require('express');
        const router = express.Router();

        router.get('/', (req, res) => {
            res.render('login/index', {
                title: 'CocoMusic',
                user: req.user,
                mesageLogin: req.flash('loginMessage'),
                controller: 'login'
            });
            /*
            if(req.user){
                res.redirect('/');
            } else {
                
            }*/
        });

        router.post('/', passport.authenticate('local-login', {
            successRedirect: '/login',
            failureRedirect: '/login',
            failureFlash: true
        }));
        return router;
    };
})();
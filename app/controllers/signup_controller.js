(() => {
    'use strict';
    module.exports = function(passport) {
        const express = require('express');
        const router = express.Router();
    
        router.get('/', (req, res) => {
            res.render('signup/index' , {
                user: req.user,
                messageSingup: req.flash('signupMessage'),
                controller: 'signup'
            });
        });
    
        
        router.post('/', passport.authenticate('local-signup', {
            successRedirect: '/',
            failureRedirect: '/',
            failureFlash: true
        }));
        return router;
    };
})();
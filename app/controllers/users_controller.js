(() => {
    'use strict';

    module.exports = function(passport) {
        const express = require('express');
        const router = express.Router();
        let Models = require('../models/song');
        const User =  require('../models/user');
        const Song = Models.Song;
        

        router.get('/', (req, res) => {
            // display a list of all users
            res.send('Hola mundo');
        });
        
        router.get('/:id', (req,res) => {
            // display a specific user
            
            if(!req.user) {
                res.status(403).send('No tienes permisos para ver la página de este usuario');
                return;
            }
            
            if(req.user._id != req.params.id) {
                res.status(403).send('No tienes permisos para ver la página de este usuario');
                return;
            }

            User.findById(req.user._id, (err, user) => {
                if(!user) {
                    res.status(404).send('No existe ese usuario');
                    return;
                }
                
                res.render('users/show' , {
                    user: user,
                    messageSingup: req.flash('signupMessage'),
                    controller: 'users'
                });
            });
        });
        
        /*
        
        X GET        /users          users#index   display a list of all users
        X GET        /users/new      users#new     return an HTML form for creating a new photo
        V POST       /users          users#create  create a new photo
        ~ GET        /users/:id	    users#show    display a specific photo
        ~ GET        /users/:id/edit	users#edit    return an HTML form for editing a photo
        ~ PATCH/PUT  /users/:id	    users#update  update a specific photo
        X DELETE     /users/:id	    users#destroy delete a specific photo
        
        */
        
        router.post('/', passport.authenticate('local-signup', {
            successRedirect: '/',
            failureRedirect: '/',
            failureFlash: true
        }));
        
        return router;
    };
})();
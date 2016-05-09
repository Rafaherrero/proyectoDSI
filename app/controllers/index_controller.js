(() => {
    'use strict';
    const express = require('express');
    const router = express.Router();
    // Página principal
    router.get('/', (req, res) => {
        res.render('index' , {
            user: req.user,
            messageSingup: req.flash('signupMessage'),
            controller: 'index'
        });
    });

    module.exports = router;
})();
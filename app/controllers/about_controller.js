(() => {
    'use strict';
    const express = require('express');
    const router = express.Router();
    // Página principal
    router.get('/', (req, res) => {
        res.render('about/index' , {
            user: req.user,
            controller: 'about'
        });
    });

    module.exports = router;
})();
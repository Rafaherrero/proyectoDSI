(() => {
    'use strict';

    module.exports = function() {
        const express = require('express');
        const router = express.Router();

        router.get('/', function(req, res) {
            res.send('Hola mundo');
        });
        
        router.post('/', function(req, res) {
            console.log(req.body)
        });
        
        return router;
    };
})();
(() => {
    'use strict';
    module.exports = (app, passport) => {
        // Guardamos las rutas que nos proporciona index en index
        
        const index = require(get_controller('index'));
        const login = require(get_controller('login'))(passport);
        const signup = require(get_controller('signup'))(passport);
        const logout = require(get_controller('logout'))(passport);
        const users = require(get_controller('users'))(passport);

        // Rutas. Por defecto, que vaya al controlador index
        app.use('/', index);
        app.use('/login', login);
        app.use('/signup', signup);
        app.use('/logout', logout);
        app.use('/users', users);
        
    };
    
    function get_controller(name) {
        return `../app/controllers/${name}_controller.js`;
    }
})();
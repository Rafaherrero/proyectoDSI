var LocalStrategy = require('passport-local').Strategy;
var User = require('../app/models/user');

module.exports = function(passport) {
    // se usa para serializar los usuarios para la sesión (el módulo de express)
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // para deserializiarlo
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // REGISTRO
    passport.use('local-signup', new LocalStrategy(
        {
            // por defecto, local strategy usa el nombre de usuaro y la contraseña,
            // pero nosotros usamos el email y contraseña.
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true // nos permite devolver la petición a la callback
        },
        function(req, email, password, done) {
            // asíncrono, User.findOne no se ejectuará a no ser que haya datos que devolver
            process.nextTick(function() {
                // encontrar un usuario cuyo email es el mismo que el del formulario
                User.findOne({ 'local.email' :  email }, function(err, user) {
                    if (err) return done(err);

                    // revisar si hay un usuario con ese email
                    if (user) {
                        return done(null, false, req.flash('signupMessage', 'Ese email ya está cogido.'));
                    } else {
                        // si no existe, crear uno nuevo
                        var newUser = new User();
                        newUser.local.email    = email;
                        newUser.local.password = newUser.generateHash(password);
                        // salvar el usuario
                        newUser.save(function(err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });
                    }
                });
            });
        }
    ));

    // INICIO DE SESIÓN
    passport.use('local-login', new LocalStrategy(
        {
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true
        },
        function(req, email, password, done) { //callback con el email y la contraseña del formulario
            User.findOne({ 'local.email' :  email }, function(err, user) {
                if (err) return done(err);

                // Si no se encontró al usuario, devolver el error
                if (!user)
                    return done(null, false, req.flash('loginMessage', 'No existe ese correo.'));

                // Si existe el usuario, pero la contraseña está mal, devolver error
                if (!user.validPassword(password))
                    return done(null, false, req.flash('loginMessage', 'La contraseña es errónea.'));

                // si todo fue bien, devolver el usuario
                return done(null, user);
            });

        }
    ));
};
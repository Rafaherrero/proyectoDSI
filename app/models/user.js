(() => {
    'use strict';
    var mongoose = require('mongoose');
    var bcrypt = require('bcrypt-nodejs');

    var UserSchema = mongoose.Schema({
        local: {
            email: String,
            password: String
        }
    });

    // métodos ======================
    // generar un hash a partir de la contraseña
    UserSchema.methods.generateHash = function(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    };

    // verificar si la contraseña es válida
    UserSchema.methods.validPassword = function(password) {
        return bcrypt.compareSync(password, this.local.password);
    };

    // exportar el modelo
    module.exports = mongoose.model('User', UserSchema);
})();
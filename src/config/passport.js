const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const User = require('../models/user');

passport.use(new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    //confirmar si existe correo

    const user = await User.findOne({ email });
    if (!user) {
        return done(null, false, { message: 'Usuario no encontrado' })
    } else {
        //validar contraseña de usuario
        const comparar = await user.compararPassword(password);
        if (comparar) {
            return done(null, user);
        } else {
            return done(null, false, { message: 'Contraseña incorrecta' });
        }
    }

}));

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    })
})
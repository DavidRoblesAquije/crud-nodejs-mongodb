const userControl = {};

const passport = require('passport');

const usuario = require('../models/user');

//registrar cuenta

userControl.renderRegistro = (req, res) => {
    res.render('users/signup');
}

userControl.Registro = async (req, res) => {
    //console.log(req.body);
    const errores = [];
    const { name, email, password, confirm_password } = req.body;

    if (password != confirm_password) {
        errores.push({ text: 'Las contraseñas no coinciden' });
    }
    if (password.length < 4) {
        errores.push({ text: 'contraseña poca segura, tiene menos de 4 caracteres' });
    }
    if (errores.length > 0) {
        res.render('users/signup', {
            errores,
            name,
            email
        });
    } else {
        const emailuser = await usuario.findOne({ email: email });
        if (emailuser) {
            req.flash('error_msg', 'El correo ya existe');
            res.redirect('/users/signup');
        } else {
            const newUser = new usuario({ name, email, password });
            newUser.password = await newUser.encriptarPassword(password);
            await newUser.save();
            req.flash('success_msg','Registrado satisfactoriamente');
            res.redirect('/users/signin');
        }
    }
}

//login

userControl.renderLogin = (req, res) => {
    res.render('users/signin');
}

userControl.Login = passport.authenticate('local',{
    failureRedirect: '/users/signin',
    successRedirect: '/notes',
    failureFlash: true
});

//cerrar sesion

userControl.cerrarSesion = (req, res) => {
   req.logout();
   req.flash('success_msg','Sesion cerrada');
   res.redirect('/users/signin');
}

module.exports = userControl;
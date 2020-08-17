const { Router } = require('express');
const router = Router();

const { renderRegistro,
    Registro,
    renderLogin,
    Login,
    cerrarSesion } = require('../controllers/users.controller');

//registrar nuevo usuario

router.get('/users/signup', renderRegistro);

router.post('/users/signup', Registro);

//ingresar cuenta de usuario

router.get('/users/signin', renderLogin);

router.post('/users/signin', Login);

//cerrar sesion

router.get('/users/logout', cerrarSesion);

module.exports = router;
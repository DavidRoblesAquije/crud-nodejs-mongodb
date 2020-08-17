const { Router } = require('express');
const router = Router();

const { renderFormNotas,
    crearNuevaNota,
    renderTodasNotas,
    renderEditarForm,
    actualizarNota,
    eliminarNota } = require('../controllers/notes.controller');

const { estaAutenticado } = require('../helpers/validar');

//nueva nota
router.get('/notes/add', estaAutenticado, renderFormNotas);

router.post('/notes/new-note', estaAutenticado, crearNuevaNota);

//obtener todas las notas

router.get('/notes', estaAutenticado, renderTodasNotas);

//editar notas

router.get('/notes/edit/:id', estaAutenticado, renderEditarForm);

router.put('/notes/edit/:id', estaAutenticado, actualizarNota);

/**POST para crear algo nuevo, PUT para actualizar algo que ya existe**/

//eliminar notas

router.delete('/notes/delete/:id', estaAutenticado, eliminarNota);

module.exports = router;
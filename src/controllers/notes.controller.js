const notasControl = {};

const Note = require('../models/note');

notasControl.renderFormNotas = (req, res) => {
    res.render('notes/new-note');
};

//crear una nueva nota

notasControl.crearNuevaNota = async (req, res) => {
    //console.log(req.body);
    //res.send('nueva nota');
    const { title, description } = req.body; //extraemos los valores de title y description (debes haberlas creada)
    const nuevaNota = new Note({ title, description }) // title: otronombre, description: otro (si tienen nombres distintos)
    nuevaNota.user = req.user.id;
    await nuevaNota.save();
    req.flash('success_msg', 'Nota agregada satisfactoriamente'); //guarda el mensaje en el servidor
    res.redirect('/notes');
}

//ver todas las notas

notasControl.renderTodasNotas = async (req, res) => {
    const notes = await Note.find({ user: req.user.id }).sort({ createdAt: 'desc' }).lean(); //encuentra todas las notas creadas en la base de datos
    res.render('notes/all-notes', { notes });
}

//actualizar

notasControl.renderEditarForm = async (req, res) => {
    const notaEditar = await Note.findById(req.params.id).lean();
    //console.log(notaEditar);
    if(notaEditar.user != req.user.id){
        req.flash('error_msg','no autorizado');
        return res.redirect('/notes');
    }
    res.render('notes/edit-note', { note: notaEditar });
}

notasControl.actualizarNota = async (req, res) => {
    //console.log(req.body);
    const { title, description } = req.body;
    await Note.findByIdAndUpdate(req.params.id, { title, description });
    req.flash('success_msg', 'Nota actualizada correctamente');
    res.redirect('/notes');
}

//eliminar

notasControl.eliminarNota = async (req, res) => {
    //console.log(req.params.id)
    await Note.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Nota eliminada satisfactoriamente');
    res.redirect('/notes');
}

module.exports = notasControl;
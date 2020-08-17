//datos relacionados con los usuarios

const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, {
    timestamps: true //obtener fecha de creacion de usuario
});



/****cifrar contraseña de usuario****/
UserSchema.methods.encriptarPassword = async password => {
    const salt = await bcrypt.genSalt(10);//esta funcion es asincrona
    return await bcrypt.hash(password, salt);
};

/****comparar contraseña de usuario****/
UserSchema.methods.compararPassword = async function (password) {
    return await bcrypt.compare(password, this.password); //this.password va a USerchema y va a la variable password
}

module.exports = model('User', UserSchema);
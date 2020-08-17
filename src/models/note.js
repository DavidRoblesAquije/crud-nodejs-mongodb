//datos relacionados con las notas

const { Schema, model } = require('mongoose');

const NoteSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    user: { type: String, require: true }
}, {
    timestamps: true
})

module.exports = model('Note', NoteSchema);
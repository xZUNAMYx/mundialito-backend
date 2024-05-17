import mongoose, { Schema } from 'mongoose';

const EventoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    notes: {
        type: String,
    },

    start: {
        type: Date,
        required: true,
    },

    end: {
        type: Date,
        required: true,
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
    }
});

//Para modificar como se ve el json pero no sirve de nada ya que igual se guarda normal en la base de datos
// EventoSchema.method('toJSON', function() {
//     const { __v, _id, ...object } = this.toObject();
//     object.id = _id;
//     return object;
// })

module.exports = mongoose.model('Evento', EventoSchema);
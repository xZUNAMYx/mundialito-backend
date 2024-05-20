import mongoose, { Schema } from 'mongoose';

const TeamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    points: {
        type: Number,
        required: true,
    },

    users: {
        type: [Schema.Types.ObjectId],
        ref: 'Usuario',
        required: true,
    }
});

module.exports = mongoose.model('Team', TeamSchema);
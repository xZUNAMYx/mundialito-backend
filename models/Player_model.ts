const mongoose = require('mongoose');

const PlayerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    point: {
        type: Number,
        required: true
    },
});

module.exports = mongoose.model('Player', PlayerSchema);
import mongoose, { Schema } from 'mongoose';

const ChampionshipSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    Teams: {
        type: [],
        required: true,
    }
});

module.exports = mongoose.model('Championship', ChampionshipSchema);
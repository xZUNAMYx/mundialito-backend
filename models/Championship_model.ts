import mongoose, { Schema } from 'mongoose';

const ChampionshipSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    Teams: {
        type: [Schema.Types.ObjectId],
        ref: 'Team',
        required: true,
    }
});

module.exports = mongoose.model('Championship', ChampionshipSchema);
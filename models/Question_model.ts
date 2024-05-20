import mongoose, { Schema } from 'mongoose';

const QuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
    },

    code: {
        type: String,
        required: true,
    },

    answers: {
        type: [String],
        required: true,
    },

    correctAnswer: {
        type: Number,
        required: true,
    }
});

module.exports = mongoose.model('Question', QuestionSchema);
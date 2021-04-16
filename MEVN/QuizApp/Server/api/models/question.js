const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const questionSchema = new Schema({
    category: String,
    description: String,
    option1: String,
    option2: String,
    option3: String,
    option4: String,
    answer: String,
    language: String

}, {timestamps: true});

const Question = mongoose.model('Question', questionSchema);
module.exports = Question;
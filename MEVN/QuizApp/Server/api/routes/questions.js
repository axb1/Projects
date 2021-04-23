const express = require('express');
const router = express.Router();
const Question = require('../models/question');
const checkAuth = require('../middleware/check-auth');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerDocument));


// Get all questions
router.get('/', async (req, res) => {
    try {
        const questions = await Question.find();
        res.json(questions);

    } catch(err) {
        res.json({message: err})
    }
});


// Get questions by category
router.get('/:category', async (req, res) => {
    const category = req.params.category;
    console.log(category);
    Question.find({category: category})
    .exec()
    .then(doc => {
        if (doc) {
            res.status(200).json(doc);
        } else {
            res.status(404).json({message: 'No valid entry'})
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    })
})

// Add question
router.post('/', async (req, res) => {
    const question = new Question({
        category: req.body.category,
        description: req.body.description,
        option1: req.body.option1,
        option2: req.body.option2,
        option3: req.body.option3,
        option4: req.body.option4,
        answer: req.body.answer,
        language: req.body.language
        
    });

    try {
        const savedQuestion = await question.save()
        res.json(savedQuestion);
    } catch(err){
        res.json({message: err})
    }
});

// Delete question by id
router.delete('/:questionId', checkAuth, async (req, res) => {
    try {
        const removedQuestion = await Question.deleteOne({_id: req.params.questionId})
        res.json(removedQuestion);
    } catch(err) {
        res.json({message: err})
    }
})



module.exports = router;
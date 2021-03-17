import axios from 'axios';

const url = 'https://quiz-app-dk.herokuapp.com/question/';

class QuestionService {
    // Get question
    static getQuestion() {
        return new Promise ((resolve,reject) => {
            axios.get(url).then((res) => {
                const data = res.data;
                resolve(
                    data.map(question => ({
                        ...question,
                        createdAt: new Date(question.createdAt)
                    }))
                );
            })
            .catch((err)=> {
                reject(err);
            })
            
        });
    }
    
    // Get questions by category
    static getQuestionsByCategory(category) {
        return new Promise ((resolve,reject) => {
            axios.get(url + category).then((res) => {
                const data = res.data;
                resolve(
                    data.map(question => ({
                        ...question,
                        createdAt: new Date(question.createdAt)
                    }))
                );
            })
            .catch((err)=> {
                reject(err);
            })
            
        });
    }
}

export default QuestionService;
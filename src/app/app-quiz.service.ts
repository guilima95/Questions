import {QuizModel} from '../app/models/quiz.model';

export class QuizService{
    private fs = require('fs');
    private quizArray: Array<QuizModel>;

    public async GetQuizzes(): Promise<Array<QuizModel>>{
        this.fs.readFile('../app/data/db.json', handleJSONFile);

        var handleJSONFile = async function(err, data){
            if(err){
                throw err;
            }

            this.quizArray = await JSON.parse(data);
        }

        return this.quizArray;
    }
}
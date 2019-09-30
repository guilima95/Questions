import { Component } from '@angular/core';
import {QuizModel} from '../app/models/quiz.model';
import dataQuiz from './data/db.json';

@Component({
    selector: 'app-root'
})

export class QuizService{
    //private fs = require('fs');
    private quizArray: Array<QuizModel>;

    public async GetQuizzes(): Promise<Array<QuizModel>>{
        //this.fs.readFile('../app/data/db.json', handleJSONFile);

        // var handleJSONFile = async function(err, data){
        //     if(err){
        //         throw err;
        //     }

        //     this.quizArray = await JSON.parse(data);
        // }

        this.quizArray = dataQuiz;

        return this.quizArray;
    }
}
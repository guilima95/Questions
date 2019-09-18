import {AnswerModel} from './answer.model';
import {QuizModel} from './quiz.model';

/**
 * Question data model
 * 
 * @export
 * @interface QuestionModel
 */
export interface QuestionModel{

    /**
     * Question id
     * 
     * @type {number}
     * @memberof QuestionModel
     */
    questionId: number;

    /**
     * Question title
     * 
     * @type {string}
     * @memberof QuestionModel
     */
    questionTitle: string;

    /**
     * Question description
     * 
     * @type {string}
     * @memberof QuestionModel
     */
    questionDescription: string;

    /**
     * Question answered
     * 
     * @type {boolean}
     * @memberof QuestionModel
     */
    questionAnswered: boolean;

    /**
     * Question quiz
     * 
     * @type {QuizModel}
     * @memberof QuizModel
     */
    quiz: QuizModel;

    /**
     * Question answers
     * 
     * @type {Array<AnswerModel>}
     * @memberof QuestionModel
     */
    answers: Array<AnswerModel>;
}
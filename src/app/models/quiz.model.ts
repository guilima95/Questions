import {QuestionModel} from './question.model';

/**
 * Quiz data model
 * 
 * @export
 * @interface QuizModel
 */
export interface QuizModel{

    /**
     * Quiz id
     * 
     * @type {string}
     * @memberof QuizModel
     */
    quizId: number;

    /**
     * Quiz name
     * 
     * @type {number}
     * @memberof QuizModel
     */
    quizName: string;

    /**
     * Quiz answered
     * 
     * @type {boolean}
     * @memberof QuizModel
     */
    quizAnswered: boolean;

    /**
     * Quiz questions
     * 
     * @type {Array<QuestionModel>}
     * @memberof QuizModel
     */
    questions: Array<QuestionModel>;
}
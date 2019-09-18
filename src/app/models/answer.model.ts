import {OptionModel} from './option.model';
import {QuestionModel} from './question.model';

/**
 * Answer data model
 * 
 * @export
 * @interface AnswerModel
 */
export interface AnswerModel{

    /**
     * Answer id
     * 
     * @type {number}
     * @memberof AnswerModel
     */
    answerId: number;
    
    /**
     * Answer name
     * 
     * @type {string}
     * @memberof AnswerModel
     */
    answerName: string;

    /**
     * Answer selected
     * 
     * @type {boolean}
     * @memberof AnswerModel
     */
    answerSelected: boolean;

    /**
     * Answer quetion
     * 
     * @type {QuestionModel}
     * @memberof AnswerModel
     */
    question: QuestionModel;

    /**
     * Answer options
     * 
     * @type {Array<OptionModel>}
     * @memberof AnswerModel
     */
    options: Array<OptionModel>;
}
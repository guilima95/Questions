import {AnswerModel} from './answer.model';

/**
 * Option data model
 * 
 * @export
 * @interface OptionModel
 */
export interface OptionModel{

    /**
     * Option id
     * 
     * @type {number}
     * @memberof OptionModel
     */
    optionId: number;

    /**
     * Option name
     * 
     * @type {string}
     * @memberof OptionModel
     */
    optionName: string;

    /**
     * Option name
     * 
     * @type {boolean}
     * @memberof OptionModel
     */
    optionSelected: boolean;

    /**
     * Option answer
     * 
     * @type {AnswerModel}
     * @memberof OptionModel
     */
    answer: AnswerModel;
}
import {QuestionModel} from '../app/models/question.model';
import {AnswerModel} from '../app/models/answer.model';

export class AnswerService{
    
    private objAnswer: AnswerModel;
    private ojbAnswerArray: Array<AnswerModel>;    
    private dictionary: {[index: string]: string} = {};

    public twoQuizAnswer(question: QuestionModel): Array<AnswerModel>{
        let arrayAnswer = this.ojbAnswerArray;

        //#region Answers Question One
        let asw1QuestOne = this.objAnswer;
        asw1QuestOne.answerId = 1;
        asw1QuestOne.answerName = "Faz sons que mostram para você que ele ou ela está feliz ou chateado.";
        asw1QuestOne.answerSelected = false;
        asw1QuestOne.question = question;
        //#endregion

        //#region Answers Question One
        let asw2QuestOne = this.objAnswer;
        asw2QuestOne.answerId = 2;
        asw2QuestOne.answerName = "Parece feliz em ver você.";
        asw2QuestOne.answerSelected = false;
        asw2QuestOne.question = question;
        //#endregion

        //#region Answers Question One
        let asw3QuestOne = this.objAnswer;
        asw3QuestOne.answerId = 3;
        asw3QuestOne.answerName = "Segue com os olhos o movimento de um brinquedo.";
        asw3QuestOne.answerSelected = false;
        asw3QuestOne.question = question;
        //#endregion

        //#region Answers Question One
        let asw4QuestOne = this.objAnswer;
        asw4QuestOne.answerId = 4;
        asw4QuestOne.answerName = "Vira a cabeça para achar a pessoa que está falando.";
        asw4QuestOne.answerSelected = false;
        asw4QuestOne.question = question;
        //#endregion

        //#region Answers Question One
        let asw5QuestOne = this.objAnswer;
        asw5QuestOne.answerId = 5;
        asw5QuestOne.answerName = "Mantém a cabeça firme quando puxado para sentar.";
        asw5QuestOne.answerSelected = false;
        asw5QuestOne.question = question;
        //#endregion

        //#region Answers Question One
        let asw6QuestOne = this.objAnswer;
        asw6QuestOne.answerId = 6;
        asw6QuestOne.answerName = "Junta as mãos.";
        asw6QuestOne.answerSelected = false;
        asw6QuestOne.question = question;
        //#endregion

        //#region Answers Question One
        let asw7QuestOne = this.objAnswer;
        asw7QuestOne.answerId = 7;
        asw7QuestOne.answerName = "Ri";
        asw7QuestOne.answerSelected = false;
        asw7QuestOne.question = question;
        //#endregion

        //#region Answers Question One
        let asw8QuestOne = this.objAnswer;
        asw8QuestOne.answerId = 8;
        asw8QuestOne.answerName = "Mantém a cabeça firme quando você o/a segura na posição sentada.";
        asw8QuestOne.answerSelected = false;
        asw8QuestOne.question = question;
        //#endregion

        //#region Answers Question One
        let asw9QuestOne = this.objAnswer;
        asw9QuestOne.answerId = 9;
        asw9QuestOne.answerName = "Faz sons como \"ga\", \"ma\" ou \"ba\".";
        asw9QuestOne.answerSelected = false;
        asw9QuestOne.question = question;
        //#endregion

        //#region Answers Question One
        let asw10QuestOne = this.objAnswer;
        asw10QuestOne.answerId = 10;
        asw10QuestOne.answerName = "Olha quando você o/a chama pelo nome.";
        asw10QuestOne.answerSelected = false;
        asw10QuestOne.question = question;
        //#endregion

        return arrayAnswer;
    }
}
import {QuizModel} from '../app/models/quiz.model';
import {QuestionModel} from '../app/models/question.model';
import {AnswerModel} from '../app/models/answer.model';
import {OptionModel} from '../app/models/option.model';

export class QuestionService {

    private objQuiz: QuizModel;
    private objQuestion: QuestionModel;
    private objAnswer: AnswerModel;
    private objOption: OptionModel;
    private ojbQuizArray: Array<QuizModel>;    
    private dictionary: {[index: string]: string} = {};

    //#region Titles
    private ttlMarcosDesenv: string = "Marcos do Desevnvolvimento."
    //#endregion

    private readonly MARCO_DESENVOLVIMENTO: string = "MARCO_DESENVOLVIMENTO";
    private readonly SINTOMAS_BEBE: string = "SINTOMAS_BEBE";

    public getQuizArray(): Array<QuizModel>{
        return this.ojbQuizArray;
    }

    private twoMonthIssues(quiz: QuizModel): Array<QuestionModel>{
        let questionArray: Array<QuestionModel>;
        let quizTwo = this.objQuiz;        

        //#region QuestionOne
        let questionOne = this.objQuestion;
        questionOne.questionId = 1;
        questionOne.questionDescription = this.dictionary[this.MARCO_DESENVOLVIMENTO];
        questionOne.questionTitle = this.ttlMarcosDesenv;
        questionOne.questionAnswered = false;
        questionOne.quiz = quiz;

        let answerQuestionOne = this.objAnswer;
        answerQuestionOne.answerId = 1;
        answerQuestionOne.answerName = "";
        answerQuestionOne.answerSelected = false;
        answerQuestionOne.question = questionOne;
        questionOne.answers.push(answerQuestionOne);
        //#endregion

        return questionArray;
    }

    private createDictionary(){
        this.dictionary[this.MARCO_DESENVOLVIMENTO] = "As perguntas a seguir são sobre o desenvolvimento de sua criança. Por favor, conte para nós o quanto sua criança faz cada uma destas coisas. Se sua criança já deixou de fazer alguma destas coisas, escolha a resposta que melhor descreve o quanto ele/ela costumava fazer isso antes. Por favor, verifique se respondeu TODAS as perguntas.";
        this.dictionary[this.SINTOMAS_BEBE] = "Estas perguntas são sobre o comportamento da sua criança. Pense sobre o que você esperaria de outras crianças da mesma idade e nos conte o quanto cada pergunta descreve o comportamento de sua criança.";
        //this.dictionary[]
    }
}
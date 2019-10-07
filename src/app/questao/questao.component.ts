import { ApiService } from './../api-service.service';
import { NavController, ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../app-quiz.service';
import { QuizModel } from '../models/quiz.model';
import { QuestionModel } from '../models/question.model';
import { QuestionarioRespondido } from '../models/questionarioRespondido.model';
//import { AnswerModel } from '../models/answer.model';
import { ModalOptionPage } from '../modal/modal-option/modal-option.page';

@Component({
  selector: 'app-questao',
  templateUrl: './questao.component.html',
  styleUrls: ['./questao.component.scss'],
})
export class QuestaoComponent implements OnInit {
  argumentos = null;
  public quizList: Array<QuizModel>;
  public questions: Array<QuestionModel>;
  public disableAnswerList: number [];
  private questionnaireAnswered: QuestionarioRespondido = new QuestionarioRespondido();
  private quizId: number;  

  ngOnInit(): void {
    this.argumentos = this.route.snapshot.params.optional_id;
    if (this.argumentos != null) {
      this.quizId = this.argumentos;
      this.questionnaireAnswered.id = this.argumentos;
      this.listaQuiestionarios(this.argumentos);
    }
  }

  constructor(private navCtrl: NavController, private api: ApiService, private apiQuiz: QuizService, 
    private route: ActivatedRoute, private router: Router, public modalController: ModalController) {
      this.disableAnswerList = [];
     }

  goBack() {
    this.argumentos = null;
    this.navCtrl.back();
  }

  async showModal(questionId: number, answerId: number){
    const modal = await this.modalController.create({
      component: ModalOptionPage,
      componentProps:{
        'answerId': answerId,
        'quizId': this.quizId
      }
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    this.montaQuestionarioRespondido(questionId, answerId, data.optionId);
  }

  listaQuiestionarios(id: number) {
    this.quizList = new Array<QuizModel>();
    this.questions = new Array<QuestionModel>();
    
    this.apiQuiz.GetQuizzes().then((res: any) => {
      this.quizList = res.questionario;
      this.quizList = this.quizList.filter(f => f.id == id);
      
      this.quizList.forEach(f => {
          this.questions = f.questoes;
      });
    });
  }

  desabilitaOpcao(answerId: number): boolean{
    let retorno: boolean = false;

    if(this.disableAnswerList.some(s => s.valueOf() == answerId))
      retorno = true;

    return retorno;
  }

  habilitaBotao(): boolean{
    let qtdTotalQuestoes: number;
    let qtdQuestaoRespondida: number = this.questionnaireAnswered.questoes.length;    

    this.quizList.forEach(q => {
      q.questoes.forEach(qt => {
        qtdTotalQuestoes = qt.respostas.length;
      });
    });

    return qtdTotalQuestoes == qtdQuestaoRespondida ? true : false;
  }

  salvarRespostas(){
    this.salvandoRespostas(this.api.KEY_QUESTIONARIOS_RESPONDIDOS + this.quizId.toString(), JSON.stringify(this.questionnaireAnswered));
  }

  private salvandoRespostas(key: string, questionario: string) {
    this.api.save(key, questionario).then((res) => {
      //Fazer mesnagem de sucesso e direcionar para respondido.
    }).catch((err) => {
      console.log('');
    });
  }

  private recuperarQuestionario(key: string) {
    this.api.recuperar(key).then((questionario: any) => {
      console.log(questionario);
    }).catch((err) => {
    });
  }

  private montaQuestionarioRespondido(questionId: number, answerId: number, optionId: number){
    let questaoResp = {
      id: questionId,
      resposta: {
        id: answerId,
        opcao: {
          id: optionId
        }
      }
    };

    this.questionnaireAnswered.questoes.push(questaoResp);
    this.disableAnswerList.push(answerId);
  }
}

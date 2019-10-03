import { ApiService } from './../api-service.service';
import { NavController } from '@ionic/angular';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../app-quiz.service';
import { QuizModel } from '../models/quiz.model';
import { QuestionModel } from '../models/question.model';
import { AnswerModel } from '../models/answer.model';

@Component({
  selector: 'app-questao',
  templateUrl: './questao.component.html',
  styleUrls: ['./questao.component.scss'],
})
export class QuestaoComponent implements OnInit {
  argumentos = null;
  public quizList: Array<QuizModel>;
  public questions: Array<QuestionModel>;
  public answers: Array<AnswerModel>;

  ngOnInit(): void {
    this.argumentos = this.route.snapshot.params.optional_id;
    if (this.argumentos != null) {
      this.listaQuiestionarios(this.argumentos);
    }
  }

  constructor(private navCtrl: NavController, private api: ApiService, private apiQuiz: QuizService, private route: ActivatedRoute, private router: Router) { }

  goBack() {
    this.argumentos = null;
    this.navCtrl.back();
  }

  listaQuiestionarios(id: number) {
    this.quizList = new Array<QuizModel>();
    this.questions = new Array<QuestionModel>();
    this.answers = new Array<AnswerModel>();
    
    this.apiQuiz.GetQuizzes().then((res: any) => {
      this.quizList = res.questionario;
      this.quizList = this.quizList.filter(f => f.id == id);
      
      this.quizList.forEach(f => {
          this.questions = f.questoes;
          this.questions.forEach(fq => {
              this.answers = fq.respostas;
          });
      });
    });
  }

  private salvandoRespostas(key: string, questionario: string) {
    this.api.save(key, questionario).then((res) => {
      console.log('');
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
}

import { ApiService } from './../api-service.service';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizModel } from '../models/quiz.model';
import { QuizService } from '../app-quiz.service';
import { QuestionarioRespondido } from '../models/questionarioRespondido.model';

@Component({
  selector: 'app-resposta',
  templateUrl: './resposta.component.html',
  styleUrls: ['./resposta.component.scss'],
})
export class RespostaComponent implements OnInit {
  argumentos = null;
  public quizLizt: Array<QuizModel>;

  ngOnInit(): void {
    this.argumentos = this.route.snapshot.params.optional_id;
    if (this.argumentos != null) {
      this.recuperarQuestionario(this.api.KEY_QUESTIONARIOS_RESPONDIDOS + this.argumentos);
    }
  }

  constructor(private navCtrl: NavController, private api: ApiService, private quizApi: QuizService,
     private route: ActivatedRoute, private router: Router) { }

  goBack() {
    this.argumentos = null;
    this.navCtrl.back();
  }

  private recuperarQuestionario(key: string) {
    this.api.recuperar(key).then((questionario) => {
      console.log(questionario);
      let questionarioResp: QuestionarioRespondido = JSON.parse(questionario);
      let respostaIds: Array<any> = new Array<any>();
      let opcaoIds: Array<any> = new Array<any>();

      questionarioResp.questoes.forEach(f => {
        respostaIds.push(f.resposta.id);
        opcaoIds.push(f.resposta.opcao.id);
      });

      this.quizApi.GetQuizzes().then((questionarioList: any) => {
        let quizFromDt: Array<QuizModel> = questionarioList.questionario.filter(f => f.id == questionarioResp.id);
            // f.questoes.filter(q => questionarioResp.questoes.includes(q.id) && 
            //   q.respostas.filter(r => respostaIds.includes(r.id) && 
            //     r.opcoes.filter(o => opcaoIds.includes(o.id)))));

        questionarioResp.questoes.forEach(qdt => {
          let idResposta = qdt.resposta.id;
          let idOpcao = qdt.resposta.opcao.id;

          //Melhorar a lógica
          let teste = questionarioList.questionario.find(ql => ql.questoes.find(qtl => qtl.id == qdt.id && 
            qtl.respostas.find(rl => rl.id == idResposta && 
              rl.opcoes.find(ol => ol.id == idOpcao))));          
        });
        
        console.log(this.quizLizt);
      });
    }).catch((err) => {
    });
  }
}

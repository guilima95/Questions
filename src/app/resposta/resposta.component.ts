import { ApiService } from './../api-service.service';
import { NavController, LoadingController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../app-quiz.service';
import { QuestionarioRespondido } from '../models/questionarioRespondido.model';
import { QuestionarioRespostaView } from '../models/questionarioRespostaView';
import * as jsPDF from 'jspdf';
import domtoimage from 'dom-to-image';
import { File, IWriteOptions } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';

@Component({
  selector: 'app-resposta',
  templateUrl: './resposta.component.html',
  styleUrls: ['./resposta.component.scss'],
})
export class RespostaComponent implements OnInit {
  private quizId = null;
  public questionarioRespostaView: QuestionarioRespostaView;
  public totalScore: number = 0;
  loading: any;

  ngOnInit(): void {
    this.quizId = this.route.snapshot.params.optional_id;
    if (this.quizId != null) {
      this.recuperarQuestionario(this.api.KEY_QUESTIONARIOS_RESPONDIDOS + this.quizId);
    }
  }

  constructor(private navCtrl: NavController, private api: ApiService, private quizApi: QuizService,
    private route: ActivatedRoute, private router: Router, private loadingController: LoadingController,
    private file: File, private fileOpener: FileOpener) { }

  goBack() {
    this.quizId = null;
    this.router.navigate(['']);
  }

  async presentLoadingWithOptions(msg: string) {
    const loading = await this.loadingController.create({
      spinner: null,
      message: msg,
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await loading.present();
  }

  //Implementar metodo para gerar pdf...

  private recuperarQuestionario(key: string) {
    this.questionarioRespostaView = new QuestionarioRespostaView();

    this.api.recuperar(key).then((questionario) => {
      let questionarioRespData: QuestionarioRespondido = JSON.parse(questionario);
      let respostaIds: Array<any> = new Array<any>();
      let opcaoIds: Array<any> = new Array<any>();

      questionarioRespData.questoes.forEach(f => {
        respostaIds.push(f.resposta.id);
        opcaoIds.push(f.resposta.opcao.id);
      });

      this.quizApi.GetQuizzes().then((questionarioList: any) => {
        questionarioList = questionarioList.questionario.filter(q => q.id == this.quizId);

        questionarioRespData.questoes.forEach(qdt => {
          let idResposta = qdt.resposta.id;
          let idOpcao = qdt.resposta.opcao.id;

          questionarioList.forEach(quest => {
            quest.questoes.forEach(questao => {
              if (questao.id == qdt.id) {
                this.questionarioRespostaView.questaoId = questao.id;
                this.questionarioRespostaView.descricao = questao.descricao;

                questao.respostas.forEach(resp => {
                  if (resp.id == idResposta) {
                    var resposta = {
                      id: resp.id,
                      descricao: resp.descricao,
                      opcao: {}
                    };

                    resp.opcoes.forEach(opcao => {
                      if (opcao.id == idOpcao) {
                        let opcaoObj = {
                          id: opcao.id,
                          descricao: opcao.descricao,
                          score: opcao.score
                        };

                        resposta.opcao = opcaoObj;
                        this.questionarioRespostaView.respostas.push(resposta);
                        this.totalScore = opcao.score + this.totalScore;
                      }
                    });
                  }
                });
              }
            });
          });
        });
      });
    }).catch((err) => {
      console.log(err);
    });
  }
}

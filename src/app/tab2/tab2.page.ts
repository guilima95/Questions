import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ApiService } from './../api-service.service';
import { QuizService } from '../app-quiz.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  public quizList: any;

  ngOnInit(): void {
    this.carregarQuestionarios();
  }

  constructor(private navCtrl: NavController, public router: Router, private api: ApiService, private quizApi: QuizService,
    private alertController: AlertController) { }

  goBack() {
    this.navCtrl.back();
  }

  carregarQuestionarios() {
    this.quizList = [];

    this.api.recuperar(this.api.KEY_FORMULARIO_PREENCHIDO).then((form) => {
      if (form) {
        this.quizApi.GetQuizzes().then((res) => {
          this.quizList = res;
        });
      }
      else
        this.mensagemAlerta();
    });
  }

  abrirQuestionario(id: string) {
    this.router.navigate(['/questao', id]);
  }

  respostasQuestionario(id: string) {
    this.router.navigate(['/resposta', id]);
  }

  private async mensagemAlerta() {
    const sucessoMsg = await this.alertController.create({
      header: 'Alerta!',
      message: 'Necessário preencher os dados cadastrais para responder ao questionário!',
      buttons: [
        {
          text: 'Ok',
          role: 'ok',
          cssClass: 'primary',
          handler: () => {
            this.router.navigate(['']);
          }
        }
      ]
    });

    await sucessoMsg.present();
  }
}

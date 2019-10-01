import { ApiService } from './../api-service.service';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { from } from 'rxjs';
import { QuizService } from '../app-quiz.service';

@Component({
  selector: 'app-questao',
  templateUrl: './questao.component.html',
  styleUrls: ['./questao.component.scss'],
})
export class QuestaoComponent implements OnInit {
  argumentos = null;
  public quizList: any;

  constructor(private navCtrl: NavController, private api: ApiService, private apiQuiz: QuizService, private route: ActivatedRoute, private router: Router) { }

  goBack() {
    this.argumentos = null;
    this.navCtrl.back();
  }

  ngOnInit(): void {
    this.argumentos = this.route.snapshot.params.optional_id;
    if (this.argumentos != null) {
      this.recuperarQuestionario(this.argumentos);
      this.listaQuiestionarios();
    }
  }

  private async listaQuiestionarios(){
    this.quizList = [];
    this.apiQuiz.GetQuizzes().then((res)=>{
      console.log(res);
      this.quizList = res;
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

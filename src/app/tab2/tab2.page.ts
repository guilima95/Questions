import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ApiService } from './../api-service.service';
import { QuizService } from '../app-quiz.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{  
  public quizList: any;

  ngOnInit(): void {
    this.carregarQuestionarios();
   }
 
  constructor(private navCtrl: NavController, public router: Router, private api: QuizService) { }

  goBack() {
    this.navCtrl.back();
  }

  carregarQuestionarios(){
    this.quizList = [];
    this.api.GetQuizzes().then((res)=>{
      this.quizList = res;
    });
  }
 
  abrirQuestionario(id: string) {
    this.router.navigate(['/questao', id]);
  }

  respostasQuestionario(id: string) {
    this.router.navigate(['/resposta', id]);
  }
}

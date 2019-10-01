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
export class Tab2Page implements OnInit, AfterViewInit {
  ngAfterViewInit(): void {
  
  }
  public quizList: any;
  ngOnInit(): void {
    this.quizList = [];
    this.api.GetQuizzes().then((res)=>{
      console.log(res);
      this.quizList = res;
    });
   }
 
  constructor(private navCtrl: NavController, public router: Router, private api: QuizService) { }

  goBack() {
    this.navCtrl.back();
  }
 
  abrirQuestionario(id: string) {
    this.router.navigate(['/questao', id]);
  }

  respostasQuestionario(id: string) {
    this.router.navigate(['/resposta', id]);
  }
}

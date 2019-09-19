import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(private navCtrl: NavController, public router: Router) { }

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

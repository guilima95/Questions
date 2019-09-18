import { ApiService } from './../api-service.service';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-questao',
  templateUrl: './questao.component.html',
  styleUrls: ['./questao.component.scss'],
})
export class QuestaoComponent implements OnInit {
  argumentos = null;
  constructor(private navCtrl: NavController, private api: ApiService, private route: ActivatedRoute, private router: Router) { }

  goBack() {
    this.argumentos = null;
    this.navCtrl.back();
  }

  ngOnInit(): void {
    this.argumentos = this.route.snapshot.params.optional_id;
    if (this.argumentos != null) {
      this.recuperarQuestionario(this.argumentos);
    }
  }

  private recuperarQuestionario(key: string) {
    this.api.recuperar(key).then((questionario: any) => {

    }).catch((err) => {

    });

  }
}

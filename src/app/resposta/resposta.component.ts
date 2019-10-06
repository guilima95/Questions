import { ApiService } from './../api-service.service';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-resposta',
  templateUrl: './resposta.component.html',
  styleUrls: ['./resposta.component.scss'],
})
export class RespostaComponent implements OnInit {
  argumentos = null;

  ngOnInit(): void {
    this.argumentos = this.route.snapshot.params.optional_id;
    if (this.argumentos != null) {
      this.recuperarQuestionario(this.argumentos);
    }
  }

  constructor(private navCtrl: NavController, private api: ApiService, private route: ActivatedRoute, private router: Router) { }

  goBack() {
    this.argumentos = null;
    this.navCtrl.back();
  }

  private recuperarQuestionario(key: string) {
    this.api.recuperar(key).then((questionario: any) => {
      console.log(questionario);
    }).catch((err) => {
    });
  }
}

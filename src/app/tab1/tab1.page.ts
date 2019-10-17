import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api-service.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Formulario as FormularioModel } from '../models/formulario.model';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  public formulario: FormGroup;
  public parentescoArray: Array<string>;
  public exibeNovoForm: boolean = false;

  ngOnInit(): void {
    this.criarValidacoes();

    this.parentescoArray = [
      "Mãe",
      "Pai",
      "Avó",
      "Avô",
      "Irmã",
      "Irmão",
      "Outro"
    ];

    this.api.recuperar(this.api.KEY_FORMULARIO_PREENCHIDO).then((form) => {
      this.exibeNovoForm = form ? true : false;
    });
  }

  constructor(private api: ApiService, public formBuilder: FormBuilder,
    private alertController: AlertController) { }

  validacoes_erros = {
    'nomeResponsavel': [
      { type: 'required', message: 'Nome do responsável é obrigatório.' }
    ],
    'nomeCrianca': [
      { type: 'required', message: 'Nome da criança é obrigatório.' }
    ],
    'dataNascimento': [
      { type: 'required', message: 'Data de nascimento é obrigatório.' }
    ]
  }

  onSubmit(values) {
    let formParaSalvar: FormularioModel = values;
    console.log(formParaSalvar);

    this.api.save(this.api.KEY_FORMULARIO_PREENCHIDO, JSON.stringify(formParaSalvar)).then(() => {
      this.mensagemSucesso();
    });
  }

  private criarValidacoes() {
    this.formulario = this.formBuilder.group({
      nomeResponsavel: new FormControl('', Validators.required),
      nomeCrianca: new FormControl('', Validators.required),
      dataNascimento: new FormControl('', Validators.required),
      parentesco: new FormControl('', Validators.required),
      prematuro: new FormControl('', Validators.required)
    });
  }

  private async mensagemSucesso() {
    const sucessoMsg = await this.alertController.create({
      header: 'Sucesso!',
      message: 'Formulário salvo com sucesso, agora você pode responder ao questionário!',
      buttons: [
        {
          text: 'Ok',
          role: 'ok',
          cssClass: 'primary',
          handler: () => {
            this.exibeNovoForm = true;
          }
        }
      ]
    });

    await sucessoMsg.present();
  }
}

import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api-service.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Formulario as FormularioModel } from '../models/formulario.model';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

enum tipoMensagem {
  sucesso,
  alerta,
  informacao
}

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
    private alertController: AlertController, private router: Router) { }

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
    let podeSalvar: boolean = true;

    let dataHoje = new Date();
    let dataNascimento = new Date(formParaSalvar.dataNascimento);
    let diferencaEmHoras = dataHoje.getTime() - dataNascimento.getTime();
    let diferencaEmDias = diferencaEmHoras / (1000 * 3600 * 24);

    if (parseInt(diferencaEmDias.toFixed(0)) >= 1095 && parseInt(diferencaEmDias.toFixed(0)) < 1460)
      formParaSalvar.idade = 3;
    else if (parseInt(diferencaEmDias.toFixed(0)) >= 1460 && parseInt(diferencaEmDias.toFixed(0)) < 1825)
      formParaSalvar.idade = 4;
    else
      podeSalvar = false;

    //limpar form
    this.salvarFormulario(podeSalvar, formParaSalvar, values);
  }

  novoQuestionario() {
    this.mensagem(tipoMensagem.informacao);
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

  private async mensagem(tipo: tipoMensagem, textoMensage?: string) {
    if (tipo == tipoMensagem.sucesso) {
      const sucessoMsg = await this.alertController.create({
        header: 'Sucesso!',
        message: 'Formulário salvo com sucesso, agora você pode responder ao questionário ;)',
        buttons: [
          {
            text: 'Ok',
            role: 'ok',
            cssClass: 'primary',
            handler: () => {
              this.exibeNovoForm = true;
              this.router.navigate(['']);
            }
          }
        ]
      });

      await sucessoMsg.present();
    }
    else if (tipo == tipoMensagem.informacao) {
      const informacaoMsg = await this.alertController.create({
        header: 'Atenção!',
        message: 'Os questionários respondidos serão apagados, caso não tenha compartilhado o questionário, realize via e-mail, se já compartilhou, clique em "Ok"!',
        buttons: [
          {
            text: 'Ok',
            role: 'ok',
            cssClass: 'primary',
            handler: () => {
              this.exibeNovoForm = false;
              this.api.clearLocalStorage();
            }
          },
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'danger',
            handler: () => {
              this.exibeNovoForm = true;
            }
          }
        ]
      });

      await informacaoMsg.present();
    }
    else {
      const alertaMsg = await this.alertController.create({
        header: 'Atenção!',
        message: textoMensage,
        buttons: [
          {
            text: 'Ok',
            role: 'ok',
            cssClass: 'primary',
            handler: () => {
            }
          }
        ]
      });

      await alertaMsg.present();
    }
  }

  private async salvarFormulario(podeSalvar: boolean, formulario: FormularioModel, valuesForm: any){
    if (podeSalvar) {
      await this.api.save(this.api.KEY_FORMULARIO_PREENCHIDO, JSON.stringify(formulario)).then(() => {
        this.mensagem(tipoMensagem.sucesso);
        valuesForm.resetForm();
      });
    }
    else {
      await this.mensagem(tipoMensagem.alerta, "A idade da criança está fora da faixa de 3 ou 4 anos de idade!");
    }
  }
}

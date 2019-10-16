import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api-service.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Formulario } from '../models/formulario.model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  public formulario: FormGroup;

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      nomeResponsavel: new FormControl('', Validators.required),
      nomeCrianca: new FormControl('', Validators.required),
      dataNascimento: new FormControl('', Validators.required),
      parentesco: new FormControl('', Validators.required),
      prematuro: new FormControl('', Validators.required)
    });
  }

  constructor(private api: ApiService, public formBuilder: FormBuilder) { }

  private criarValidacoes() {
    this.formulario = this.formBuilder.group({
      nomeResponsavel: new FormControl('', Validators.required),
      nomeCrianca: new FormControl('', Validators.required),
      dataNascimento: new FormControl('', Validators.required),
      parentesco: new FormControl('', Validators.required),
      prematuro: new FormControl('', Validators.required)
    });
  }

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

  onSubmit(values){
    console.log(values);
  }
}

import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { AnaliseService } from 'src/services/analise.service';
@Component({
  selector: 'app-analise',
  templateUrl: './analise.page.html',
  styleUrls: ['./analise.page.scss'],
})
export class AnalisePage implements OnInit {
  analise;
  respostas = [];
  allAnalises: Array<any>;
  amostras: Array<any>;
  escalas: Array<any>
  escolherAnalise = true;
  a;
  constructor(private analiseService: AnaliseService, public loading: LoadingController) {
    this.analise = {};
    this.allAnalises = [];
  }

  ngOnInit() {
    this.carregarAnalises();
  }
  sair() {
    this.escolherAnalise = true;
    this.analise = {};
    this.amostras = [];
    this.escalas = [];
  }
  async getAnalise(id) {
    let load = await this.loading.create({
      message: 'Carregando',
    });
    load.present();
    await this.analiseService.getAllAnalise(id).then(data => {
      if (data[0]) {
        this.analise = data[0];
        this.amostras = data[0].amostras;
        this.escalas = data[0].amostras[0].escalas;
      }
    });
    this.escolherAnalise = false;
    let amostras = [];
    this.amostras.forEach(amostra => {
      let escalas = [];
      amostra.escalas.forEach(escala => {
        let respostas = [];
        escala.atributos.forEach(atributo => {
          respostas.push({ posicao: atributo.posicao_atributo, valor: '' });
        });
        escalas.push({ id: escala.id_escala, respostas: respostas });
      });
      amostras.push({ id: amostra.id_amostra, escalas: escalas });
    });
    this.respostas.push({analise: id, nome: '', faixa: '', consumo: '', amostras: amostras});
    load.dismiss();
    console.log(this.respostas);
  }
  async carregarAnalises() {
    await this.analiseService.getActiveAnalises().then(res => {
      if (res) {
        this.allAnalises = res;
        console.log(this.allAnalises);
      }
    });
  }
  ad() {
    console.log(this.respostas);
  }
  submit() {

    let form = new FormData();
    form.append("saveRespostas", (JSON.stringify(this.respostas[0])));
    console.log((form));
    this.analiseService.saveRespostas(form).then(res => {
      console.log((res));
    });
  }
  doRefresh(event) {
    setTimeout(() => {
      this.carregarAnalises();
      event.target.complete();
    }, 2000);

  }


}

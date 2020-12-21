import { stringify } from '@angular/compiler/src/util';
import { AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
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
  constructor(private analiseService: AnaliseService, public loading: LoadingController, private router: Router,
    public alertController: AlertController) {
    this.analise = {};
    this.allAnalises = [];
  }

  ngOnInit() {
    this.carregarAnalises();
  }
  async presentAlert(message) {
    const alert = await this.alertController.create({
      cssClass: 'alerta',
      header: "Erro",
      message: message,
      buttons: [
        {
          text: 'Ok',
          cssClass: 'alertBtn',
          handler: () => {
            console.log('ok');
          }
        }
      ],
    });
    await alert.present();
  }
  sair() {
    if (this.escolherAnalise) {
      this.goHome();
    }
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
    }, (err) => {
      setTimeout(() => {
        load.dismiss();
      }, 2000);
      this.presentAlert("Ocorreu um erro ao carregar os dados");
    });
    if (this.amostras) {
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
      this.respostas[0] = ({ analise: id, nome: '', faixa: '', consumo: '', amostras: amostras });
    }
    load.dismiss();
  }

  async carregarAnalises() {
    let load = await this.loading.create({
      message: 'Carregando',
    });
    load.present();
    await this.analiseService.getActiveAnalises().then(res => {
      if (res) {
        this.allAnalises = res;
      }
    }, (err) => {
      setTimeout(() => {
        load.dismiss();
      }, 2000);
      this.presentAlert("Ocorreu um erro ao carregar os dados");
    });
    load.dismiss();
  }

  async submit() {
    let load = await this.loading.create({
      message: 'Carregando',
    });
    load.present();
    let form = new FormData();
    form.append("saveRespostas", (JSON.stringify(this.respostas[0])));
    await this.analiseService.saveRespostas(form).then(res => {
    }, (err) => {
      setTimeout(() => {
        load.dismiss();
      }, 2000);
      this.presentAlert("Ocorreu um erro ao salvar os dados");
    });
  }

  doRefresh(event) {
    setTimeout(() => {
      this.carregarAnalises();
      event.target.complete();
    }, 2000);

  }

  goHome() {
    this.escolherAnalise = false;
    this.sair();
    this.router.navigate(['home']);    
  }
}

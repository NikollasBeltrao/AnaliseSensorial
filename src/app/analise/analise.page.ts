import { stringify } from '@angular/compiler/src/util';
import { AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { AnaliseService } from 'src/services/analise.service';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
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
  bgs = ['bg-azul', 'bg-laranja', 'bg-rosa', 'bg-amarelo'];
  a;
  constructor(private analiseService: AnaliseService, public loading: LoadingController, private router: Router,
    public alertController: AlertController, private nativePageTransitions: NativePageTransitions) {
    this.analise = {};
    this.allAnalises = [];
    console.log("d");
  }

  ngOnInit() {
    this.carregarAnalises();

  }
  async presentAlert(message, finalizar?) {
    const alert = await this.alertController.create({
      cssClass: 'alerta',
      header: (finalizar? finalizar : "Erro"),
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
    let options: NativeTransitionOptions = {
      duration: 400,
    }
    this.nativePageTransitions.fade(options)
      .catch(console.error);
    this.escolherAnalise = true;
    this.analise = {};
    this.amostras = [];
    this.escalas = [];
    this.respostas = []
  }
  async getAnalise(id) {
    let options: NativeTransitionOptions = {
      direction: 'left',
      duration: 400,
    }
    this.nativePageTransitions.slide(options)
      .catch(console.error);
    let load = await this.loading.create({
      message: 'Carregando',
    });
    load.present();
    await this.analiseService.getAllAnalise(id).then(data => {
      console.log(data);
      if (data[0]) {
        this.analise = data[0];
        if (data[0].amostras) {
          this.amostras = data[0].amostras;
          this.escalas = data[0].amostras[0].escalas;
        }
        else {
          this.amostras = [];
          this.escalas = [];
        }
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
            respostas.push({ posicao: atributo.posicao_atributo, valor: 0 });
          });
          escalas.push({ id: escala.id_escala, respostas: respostas });
        });
        amostras.push({ id: amostra.id_amostra, escalas: escalas });
      });
      this.respostas[0] = ({ analise: id, nome: '', faixa: 0, consumo: 0, amostras: amostras });
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
      this.presentAlert("Obrigado por participar da pesquisa !!! 😉", ' ');
      this.sair();      
    }, (err) => {
      setTimeout(() => {
        load.dismiss();
      }, 2000);
      this.presentAlert("Ocorreu um erro ao salvar os dados");
    });
    load.dismiss();
  }

  doRefresh(event) {
    setTimeout(() => {
      this.carregarAnalises();
      event.target.complete();
    }, 2000);

  }

  bg(i) {
    if (i >= this.bgs.length) {
      return i % this.bgs.length;
    }
    return i;
  }

  goHome() {
    let options: NativeTransitionOptions = {
      direction: 'right',
      duration: 400,
    }
    this.nativePageTransitions.slide(options)
      .catch(console.error);
    this.escolherAnalise = false;
    this.sair();
    this.router.navigate(['home']);
  }
}

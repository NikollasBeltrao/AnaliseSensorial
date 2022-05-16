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
  passos = {
    id: 0,
    err: ''
  };
  codigo_analise = '';
  analise;
  respostas = [];
  allAnalises: Array<any>;
  amostras: Array<any>;
  escalas: Array<any>
  escolherAnalise = true;
  instrucoes = false;
  bgs = ['bg-azul', 'bg-laranja', 'bg-rosa', 'bg-amarelo'];
  a;
  constructor(private analiseService: AnaliseService, public loading: LoadingController, private router: Router,
    public alertController: AlertController, private nativePageTransitions: NativePageTransitions) {
    this.analise = {};
    this.allAnalises = [];
  }

  ngOnInit() {

  }
  getByCode(e) {
    if (this.codigo_analise.length == 6) {
      this.getAnalise(e);
    }
  }
  proximo(id: number, amostra?: number) {
    switch (id) {
      case -2:
        var cont = 0;
        this.respostas[0].preferencia.respostas.forEach((re) => {
          if (re.valor == 0) {
            cont += 1;
          } 
        });
        if (cont == 0) {
          this.submit();
        }
        else {
          this.presentAlert('Preencha todos os campos', ' ');
        }
        break;
      case -1:
        var cont = 0;
        this.respostas[0].amostras[amostra].escalas.forEach((am) => {
          am.respostas.forEach((re) => {
            if (re.valor == 0 && am.tipo != "preferencia") {
              cont += 1;
            }
          });
        });
        if (cont == 0) {
          this.submit();
        }
        else {
          this.presentAlert('Preencha todos os campos', ' ');
        }
        break;
      case 1:
        if (this.respostas[0].faixa != '' && this.respostas[0].genero != '' && this.respostas[0].consumo != '') {
          this.passos = { ...this.passos, id: id };
        }
        else {
          this.presentAlert('Preencha todos os campos', ' ');
        }
        break;
      default:
        var cont = 0;
        this.respostas[0].amostras[amostra].escalas.forEach((am) => {
          am.respostas.forEach((re) => {
            if (re.valor == 0 && am.tipo != "preferencia") {
              cont += 1;
            }
          });
        });
        if (cont == 0) {
          console.log(id, this.amostras.length + 1)
          this.passos = { ...this.passos, id: id };
        }
        else {
          this.presentAlert('Preencha todos os campos', ' ');
        }
    }
  }

  anterior(id: number) {
    this.passos = { ...this.passos, id: id };
  }

  async presentAlert(message, finalizar?) {
    const alert = await this.alertController.create({
      cssClass: 'alerta',
      header: (finalizar ? finalizar : "Erro"),
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
    this.instrucoes = false;
    this.passos = {
      id: 0,
      err: ''
    }
    this.analise = {};
    this.allAnalises = [];
    this.amostras = [];
    this.escalas = [];
    this.respostas = [];
  }
  async getAnalise(e) {
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
    await this.analiseService.getAnaliseByCode(this.codigo_analise).then(data => {
      if (data[0]) {
        this.analise = data[0];
        console.log(data[0]);
        if (data[0].amostras) {
          this.amostras = data[0].amostras;
          this.escalas = data[0].amostras[0].escalas;
          this.codigo_analise = '';
          this.instrucoes = true;
          this.escolherAnalise = false;
          e.target.className = "form-control";
        }
        else {
          this.amostras = [];
          this.escalas = [];
        }
      }
      else {
        console.log(e)
        e.target.className = "form-control is-invalid";
      }
    }, (err) => {
      setTimeout(() => {
        load.dismiss();
      }, 2000);
      this.presentAlert("Ocorreu um erro ao carregar os dados");
    });
    if (this.amostras) {
      let preferencia = {};
      let amostras = [];
      this.amostras.forEach(amostra => {
        let escalas = [];
        amostra.escalas.forEach(escala => {
          let respostas = [];
          escala.atributos.forEach(atributo => {
            respostas.push({ posicao: atributo.posicao_atributo, valor: 0 });
          });
          escalas.push({ id: escala.id_escala, respostas: respostas, tipo: escala.tipo_escala });
          if (escala.tipo_escala == 'preferencia') {
            preferencia = { id: escala.id_escala, nome_escala: escala.nome_escala, desc_escala: escala.desc_escala, respostas: respostas, atributos: escala.atributos };
          }
        });
        amostras.push({ id: amostra.id_amostra, escalas: escalas });
      });
      this.respostas[0] = ({ analise: this.analise.id_analise, genero: '', nome: '', faixa: 0, consumo: 0, amostras: amostras, preferencia: preferencia });
    }
    console.log(this.respostas[0]);
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
      load.dismiss();
      this.presentAlert("Ocorreu um erro ao salvar os dados");
      console.log(err)
    });
    load.dismiss();
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

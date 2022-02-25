import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import { AlertController, LoadingController } from '@ionic/angular';
import { AnaliseService } from 'src/services/analise.service';

@Component({
  selector: 'app-listar-analises',
  templateUrl: './listar-analises.page.html',
  styleUrls: ['./listar-analises.page.scss'],
})
export class ListarAnalisesPage implements OnInit {
  analises: Array<any>;
  goToResposta = true;
  idUser = '';
  bgs = ['bg-azul', 'bg-laranja', 'bg-rosa', 'bg-amarelo'];
  constructor(private analiseService: AnaliseService, private route: Router, private active: ActivatedRoute,
    public loading: LoadingController, public alertController: AlertController, private nativePageTransitions: NativePageTransitions) { }

  async ngOnInit() {
    this.load();
    await this.active.params.subscribe(params => {
      this.idUser = params["id_user"];
    });
  }
  async load() {
    let load = await this.loading.create({
      message: 'Carregando',
    });
    load.present();
    await this.analiseService.getAllAnalises(this.idUser).then(data => {
      this.analises = data;
    }, err => {
      this.presentAlert("Erro ao alterar o status");
    });
    load.dismiss();
  }

  converterData(data) {
    return new Date(data.replace('-', '/')).toLocaleDateString();
  }

  doRefresh(event) {
    setTimeout(async () => {
      await this.load();
      event.target.complete();
    }, 2000);
  }
  goToRespostas(id) {
    this.nextPage();
    this.route.navigate(['listar-respostas', { id: id, id_user: this.idUser }]);
  }
  async switch(e, id) {
    let load = await this.loading.create({
      message: 'Carregando',
    });
    load.present();
    var novoStatus = 0;
    if (e.target.checked) {
      novoStatus = 1;
    }
    var form = new FormData();
    form.append("id", id);
    form.append("novoStatus", novoStatus + '');
    await this.analiseService.changeStatus(form).then(res => {
    }, err => {
      if (novoStatus == 1) {
        e.target.checked = false;
      }
      else {
        e.target.checked = true;
      }
      this.presentAlert("Erro ao alterar o status");
    });
    load.dismiss();
  }

  goHome() {
    this.back();
    this.route.navigate(["usuario-logado", { id_user: this.idUser }]);
  }
  goPerfil() {
    this.nextPage();
    this.route.navigate(["perfil", { id_user: this.idUser }]);
  }
  sair() {
    this.back();
    this.route.navigate(["home"]);
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

  nextPage(){
    let options: NativeTransitionOptions = {
      direction: 'left',
      duration: 400,
    }
    this.nativePageTransitions.slide(options)
      .catch(console.error);
  }
  back(){
    let options: NativeTransitionOptions = {
      direction: 'right',
      duration: 400,
    }
    this.nativePageTransitions.slide(options)
      .catch(console.error);
  }
  bg(i) {
    if (i >= this.bgs.length) {
      return i % this.bgs.length;
    }
    return i;
  }
}

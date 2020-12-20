import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  constructor(private analiseService: AnaliseService, private route: Router, private active: ActivatedRoute,
    public loading: LoadingController, public alertController: AlertController) { }

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
    await this.analiseService.getAllAnalises().then(data => {
      this.analises = data;
    }, err => {
      this.presentAlert("Erro ao alterar o status");
    });
    load.dismiss();
  }
  doRefresh(event) {
    setTimeout(async () => {
      await this.load();
      event.target.complete();
    }, 2000);
  }
  goToRespostas(id) {
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
    this.route.navigate(["home"]);
  }
  goPerfil() {

    this.route.navigate(["perfil", { id_user: this.idUser }]);
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
}

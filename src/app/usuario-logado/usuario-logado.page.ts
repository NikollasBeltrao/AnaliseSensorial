import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, Platform } from '@ionic/angular';
import { Usuario } from 'src/modal/usuario';
import { UsuarioService } from 'src/services/usuario.service';

@Component({
  selector: 'app-usuario-logado',
  templateUrl: './usuario-logado.page.html',
  styleUrls: ['./usuario-logado.page.scss'],
})
export class UsuarioLogadoPage implements OnInit {
  usuario: Usuario;
  backButtonSubscription;
  constructor(public route: Router, public active: ActivatedRoute, private http: HttpClient, public loading: LoadingController,
    private usuarioService: UsuarioService, public alertController: AlertController, private platform: Platform) {
    this.usuario = new Usuario();
  }

  ionViewDidEnter () {
    this.backButtonSubscription = this.platform.backButton.subscribe(() => {
      this.route.navigate(['login']);
    });
  }
  ionViewDidLeave (){
    this.backButtonSubscription.unsubscribe();
  }
  async ngOnInit() {
    let load = await this.loading.create({
      message: 'Carregando',

    });
    load.present();
    await this.active.params.subscribe(async parms => {
      await this.usuarioService.getUser(parms["id_user"]).
        then(response => {
          this.usuario = response

        }, (err) => {
          this.presentAlert("Erro ao conectar ao carregar os dados");
        });
    });
    load.dismiss();
  }

  listarUsuarios() {
    this.backButtonSubscription.unsubscribe();
    this.route.navigate(["listar-usuarios", { id_user: this.usuario.id_user }]);
  }

  listarAnalises() {
    this.backButtonSubscription.unsubscribe();
    this.route.navigate(["listar-analises", { id_user: this.usuario.id_user }]);

  }
  cadastrarAnalise() {
    this.backButtonSubscription.unsubscribe();
    this.route.navigate(["criar-analise", { id_user: this.usuario.id_user }]);
  }
  cadastrarUsuario() {
    this.backButtonSubscription.unsubscribe();
    this.route.navigate(["criar-usuario", { id_user: this.usuario.id_user }]);
  }
  sair() {
    this.backButtonSubscription.unsubscribe();
    this.route.navigate(["home"]);
  }
  goPerfil() {
    this.backButtonSubscription.unsubscribe();
    this.route.navigate(["perfil", { id_user: this.usuario.id_user }]);
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

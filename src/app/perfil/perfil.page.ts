import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Usuario } from 'src/modal/usuario';
import { UsuarioService } from 'src/services/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  usuario: Usuario;
  senha = '';
  novaSenha = '';
  confSenha = '';
  senhaIncorreta = true;
  validarSenha = false;

  novaSenhaIncorreta = true;
  validarNovaSenha = false;

  confirmarSenha = false;

  constructor(public active: ActivatedRoute, public formBuilder: FormBuilder, private route: Router,
    public loading: LoadingController, public usuarioService: UsuarioService, public alertController: AlertController) {
    this.usuario = new Usuario();
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
          console.log(this.usuario);
        }, (err) => {
          this.presentAlert("Erro ao conectar ao carregar os dados");
        });

    });
    load.dismiss();
  }

  goHome() {
    this.route.navigate(["home"]);
  }

  verificarSenha() {
    this.validarSenha = true;
    if (this.senha === this.usuario.senha) {
      this.senhaIncorreta = false;
    }
    else {
      this.senhaIncorreta = true;
    }
  }

  verificarNovaSenha() {
    this.validarNovaSenha = true;
    if ((this.novaSenha.length <= 10 && this.novaSenha.length >= 4) && this.novaSenha != '') {
      this.novaSenhaIncorreta = false;
    }
    else {
      this.novaSenhaIncorreta = true;
    }
    if (this.confSenha === this.novaSenha) {
      this.confirmarSenha = true;
    }
    else {
      this.confirmarSenha = false;
    }
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

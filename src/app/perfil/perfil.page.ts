import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
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
  alterar = false;
  senhaIncorreta = true;
  validarSenha = false;
  novaSenhaIncorreta = true;
  validarNovaSenha = false;

  confirmarSenha = false;

  constructor(public active: ActivatedRoute, public formBuilder: FormBuilder, private route: Router,
    public loading: LoadingController, public usuarioService: UsuarioService, public alertController: AlertController,
    private nativePageTransitions: NativePageTransitions) {
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
        }, (err) => {
          this.presentAlert("Erro ao conectar ao carregar os dados", 'Erro');
        });

    });
    load.dismiss();
  }

  goHome() {
    this.back();
    this.route.navigate(["usuario-logado", { id_user: this.usuario.id_user }]);
  }
  back() {
    let options: NativeTransitionOptions = {
      direction: 'right',
      duration: 400,
    }
    this.nativePageTransitions.slide(options)
      .catch(console.error);
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

  async alterarDados() {
    let load = await this.loading.create({
      message: 'Carregando',
    });
    load.present();
    let form = new FormData();
    form.append("senha", this.usuario.senha);
    this.validarNovaSenha = true;
    if (this.novaSenha != '') {
      if (((this.novaSenha.length <= 10 && this.novaSenha.length >= 4))) {
        this.novaSenhaIncorreta = false;
      }
      else {
        this.novaSenhaIncorreta = true;
      }
      if (this.confSenha === this.novaSenha) {
        if (!this.senhaIncorreta) {
          form.append("senha", this.novaSenha);
        }
        this.confirmarSenha = true;
      }
      else {
        this.confirmarSenha = false;
      }
    }
    this.verificarSenha();
    if (!this.senhaIncorreta) {

      form.append("id", this.usuario.id_user + '');
      form.append("nome", this.usuario.nome_user);
      form.append("matricula", this.usuario.matricula_user);
      if ((this.novaSenha != '' && !this.novaSenhaIncorreta && this.confirmarSenha) || (this.novaSenha === '')) {
        await this.usuarioService.alterUser(form).then(res => {
          console.log(res)
          if (JSON.parse(res).response){
            this.presentAlert("Dados alterados com sucesso", "");
          }
        });
      }
    }

    load.dismiss();
  }

  async presentAlert(message, head) {
    const alert = await this.alertController.create({
      cssClass: 'alerta',
      header: head,
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

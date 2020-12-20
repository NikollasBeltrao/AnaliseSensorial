import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { Usuario } from 'src/modal/usuario';
import { UsuarioService } from 'src/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  error: any = {
    message: ""
  }
  validar = false;
  usuario: Usuario;
  fGroup: FormGroup;
  constructor(public formBuilder: FormBuilder, private route: Router, public loading: LoadingController,
    public usuarioService: UsuarioService, public alertController: AlertController) {
    this.fGroup = this.formBuilder.group({
      matricula: new FormControl('', Validators.required),
      senha: ['', Validators.required]
    });
  }

  ngOnInit() {
    
  }

  async login() {
    this.validar = true;
    let load = await this.loading.create({
      message: 'Carregando',
    });
    load.present();
    await this.usuarioService.authUser(this.fGroup.value.matricula).then(data => {
      if (data != false) {
        this.usuario = <Usuario>data;
        if (this.usuario.senha == this.fGroup.value.senha) {        
          this.error.message = "";
          this.route.navigate(['usuario-logado', {id_user: this.usuario.id_user}]);
        }
        else {
          this.error.message = "Senha incorreta";
          this.presentAlert("Senha incorreta");
        }
      }
      else {        
        this.error.message = "Mátricula não cadastrada";
        this.presentAlert("Mátricula não cadastrada");
      }

    }, err => {
      this.error.message = "Erro ao conectar ao servidor";
      this.presentAlert("Erro ao conectar ao servidor");
    });
    load.dismiss();
  }

  back() {
    this.route.navigate(['home']);
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

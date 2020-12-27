import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Usuario } from 'src/modal/usuario';
import { UsuarioService } from 'src/services/usuario.service';

@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.page.html',
  styleUrls: ['./listar-usuarios.page.scss'],
})
export class ListarUsuariosPage implements OnInit {
  listUsers: Array<Usuario>;
  user: Usuario;
  id_user: any;
  searchInp: FormGroup;
  constructor(public route: Router, public active: ActivatedRoute, private usuarioService: UsuarioService, public formBuilder: FormBuilder,
    public loading: LoadingController, public alertController: AlertController) {
    this.searchInp = this.formBuilder.group({
      search: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.carregarUsuarios();
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

  async carregarUsuarios() {
    let load = await this.loading.create({
      message: 'Carregando',
    });
    load.present();
    this.active.params.subscribe(async params => {
      this.id_user = params['id_user'];
      await this.usuarioService.getAllUsers().
        then(res => {
          this.listUsers = res;
          console.log(res);
        });
    });
    load.dismiss();
  }
  doRefresh(event) {
    setTimeout(() => {
      this.carregarUsuarios();
      event.target.complete();
    }, 2000);
  }
  search() {
    let fo = new FormData();
    fo.append("searchUser", this.searchInp.value.search);
    this.usuarioService.getSearch(fo).
      then(res => {
        this.listUsers = res;
        console.log(res);

      });
  }
  backToHome() {
    this.route.navigate(['usuario-logado', { id_user: this.id_user }]);
  }

  deletar(id) {
    this.presentAlert(id);    
  }
}

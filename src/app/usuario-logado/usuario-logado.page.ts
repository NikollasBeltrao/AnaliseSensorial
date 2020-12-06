import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Usuario } from 'src/modal/usuario';
import { UsuarioService } from 'src/services/usuario.service';

@Component({
  selector: 'app-usuario-logado',
  templateUrl: './usuario-logado.page.html',
  styleUrls: ['./usuario-logado.page.scss'],
})
export class UsuarioLogadoPage implements OnInit {
  usuario: Usuario;
  constructor(public route: Router, public active: ActivatedRoute, private http: HttpClient, public loading: LoadingController,
    private usuarioService: UsuarioService) {
    this.usuario = new Usuario();
  }

  async ngOnInit() {
    let load = await this.loading.create({
      message: 'Carregando',

    });
    load.present();
    this.active.params.subscribe(async parms => {
      await this.usuarioService.getUser(parms["id_user"]).
        then(response => {
          this.usuario = response
          
        });
        load.dismiss();
    });
  }

  listarUsuarios(){
    this.route.navigate(["listar-usuarios", {id_user: this.usuario.id_user}]);
  }

  listarAnalises(){
    this.route.navigate(["listar-analises", {id_user: this.usuario.id_user}]);

  }
  cadastrarAnalise(){
    this.route.navigate(["criar-analise", {id_user: this.usuario.id_user}]);
  }
  cadastrarUsuario(){
    this.route.navigate(["criar-usuario", {id_user: this.usuario.id_user}]);
  }
}

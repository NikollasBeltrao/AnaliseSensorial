import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { IfStmt } from '@angular/compiler';
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
  constructor(private http: HttpClient, public formBuilder: FormBuilder, private route: Router, public loading: LoadingController,
    public usuarioService: UsuarioService) {
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
          load.dismiss();
        }
        else {
          this.error.message = "Senha inválida";
        }
      }
      else {        
        this.error.message = "Mátricula ou senha inválidos";
      }

    }, err => {
      this.error.message = err;
    }
    );
    load.dismiss();
  }
  back() {
    this.route.navigate(['home']);
  }
}

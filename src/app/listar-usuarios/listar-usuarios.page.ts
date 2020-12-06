import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  alterarTrue: boolean = false;
  listarTrue: boolean = true;
  cadastrarTrue: boolean = false;
  deletarTrue: boolean = false;
  searchInp: FormGroup;
  constructor(public route: Router, public active: ActivatedRoute, private usuarioService: UsuarioService, public formBuilder: FormBuilder) {
    this.searchInp = this.formBuilder.group({
      search: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.carregarUsuarios();
  }
  carregarUsuarios() {
    this.active.params.subscribe(async params => {
      this.id_user = params['id_user'];
      await this.usuarioService.getAllUsers().
        then(res => {
          this.listUsers = res;
        });
    });
  }
  doRefresh(event){
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
    this.mudarlistar();

  }
  backToHome(){
    this.route.navigate(['usuario-logado', {id_user: this.id_user}]);
  }
  mudaralterar() {
    this.alterarTrue = true;
    this.cadastrarTrue = false;
    this.listarTrue = false;
    this.deletarTrue = false;

  }

  mudarcadastrar() {
    this.alterarTrue = false;
    this.cadastrarTrue = true;
    this.listarTrue = false;
    this.deletarTrue = false;
  }

  mudarlistar() {
    this.alterarTrue = false;
    this.cadastrarTrue = false;
    this.listarTrue = true;
    this.deletarTrue = false;
  }
  mudardeletar() {
    this.alterarTrue = false;
    this.cadastrarTrue = false;
    this.listarTrue = false;
    this.deletarTrue = true;
  }

}

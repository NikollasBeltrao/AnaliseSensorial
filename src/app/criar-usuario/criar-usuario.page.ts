import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { UsuarioService } from 'src/services/usuario.service';

@Component({
  selector: 'app-criar-usuario',
  templateUrl: './criar-usuario.page.html',
  styleUrls: ['./criar-usuario.page.scss'],
})
export class CriarUsuarioPage implements OnInit {
  fGroup: FormGroup;
  senhaInvalida: boolean = false;
  submerter: boolean = false;
  id_user;
  constructor(public active: ActivatedRoute, public formBuilder: FormBuilder, private route: Router, public loading: LoadingController, public usuarioService: UsuarioService) {
    this.fGroup = this.formBuilder.group({
      nome: new FormControl('', Validators.required),
      matricula: new FormControl('', Validators.required),
      senha: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]),
      rsenha: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]),
      permissoes: new FormControl(2, Validators.required)
    });
  }

  ngOnInit() {
    this.active.params.subscribe(async parms => {
      this.id_user = parms["id_user"];
    });
  }
  validarSenha(){
    if(this.fGroup.value.senha != this.fGroup.value.rsenha){
      this.senhaInvalida = true;
      return false;
    }
    this.senhaInvalida = false;
    return true;
  }
  submit(){
    
    this.submerter = true;
    if(this.validarSenha && this.fGroup.valid){
      var form = new FormData();
      form.append('nome', this.fGroup.value.nome);
      form.append('matricula', this.fGroup.value.matricula);
      form.append('senha', this.fGroup.value.senha);      
      form.append('permissoes', this.fGroup.value.permissoes);
      this.usuarioService.createUser(form).then(res => {
        console.log(JSON.parse(res));
        if(JSON.parse(res).response){
          alert("Usuário criado com sucesso");
        }
        else if (JSON.parse(res).err){
          alert('Não foi possível completar a ação');
        }
      }, (err) =>{
        alert('Não foi possível completar a ação');
      });
    }
  }
  goHome(){
    this.route.navigate(["home"]);
  }
  goPerfil(){
    
    this.route.navigate(["perfil", {id_user: this.id_user}]);
  }
}

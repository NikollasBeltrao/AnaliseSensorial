import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
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
  tipo_user;
  id_user;
  constructor(public active: ActivatedRoute, public formBuilder: FormBuilder, private route: Router,
     public loading: LoadingController, public usuarioService: UsuarioService,  private nativePageTransitions: NativePageTransitions) {
    this.fGroup = this.formBuilder.group({
      nome: new FormControl('', Validators.required),
      matricula: new FormControl('', Validators.required),
      senha: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]),
      rsenha: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]),
      permissoes: new FormControl(1, Validators.required)
    });
  }

  ngOnInit() {
    this.active.params.subscribe(async parms => {
      this.id_user = parms["id_user"];
      this.tipo_user = parms['tipo_user'];
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
          alert("Pesquisador criado com sucesso");
        }
        else if (JSON.parse(res).err){
          alert('Não foi possível completar a ação');
        }
      }, (err) =>{
        alert('Não foi possível completar a ação');
      });
    }
  }
  goHome() {
    this.back();
    this.route.navigate(["usuario-logado", { id_user: this.id_user }]);
  }
  goPerfil() {
    this.nextPage();
    this.route.navigate(["perfil", { id_user: this.id_user }]);
  }
  sair() {
    this.back();
    this.route.navigate(["home"]);
  }
  nextPage() {
    let options: NativeTransitionOptions = {
      direction: 'left',
      duration: 400,
    }
    this.nativePageTransitions.slide(options)
      .catch(console.error);
  }
  back() {
    let options: NativeTransitionOptions = {
      direction: 'right',
      duration: 400,
    }
    this.nativePageTransitions.slide(options)
      .catch(console.error);
  }
}

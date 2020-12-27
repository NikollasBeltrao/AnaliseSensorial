import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AnaliseService } from 'src/services/analise.service';

@Component({
  selector: 'app-criar-analise',
  templateUrl: './criar-analise.page.html',
  styleUrls: ['./criar-analise.page.scss'],
})
export class CriarAnalisePage implements OnInit {
  fGroup: FormGroup;
  foto = "";
  fotos = [];
  err = "";
  validar = false;
  idUser;
  a = "https://mdbootstrap.com/img/Photos/Others/placeholder.jpg";
  constructor(private analiseService: AnaliseService, private active: ActivatedRoute,
    private loadingCtrl: LoadingController, public formBuilder: FormBuilder, private router: Router) {
    this.fGroup = this.formBuilder.group({
      titulo: new FormControl('', Validators.required),
      hedonica: new FormControl(''),
      compra: new FormControl(''),
      desc: new FormControl('', Validators.required),
      atributosHedonica: new FormControl([]),
      atributosCompra: new FormControl([]),
    });
  }

  async ngOnInit() {
    await this.active.params.subscribe(params => {
      this.idUser = params["id_user"];
    });
  }

  upload() {
    //console.log(form.tags);
    //form.tags = this.tagArrayToString(form.tags);
    this.fGroup.value.tags[0].value = 1;
    console.log(this.fGroup.value.tags);
  }

  tagArrayToString(tagArray: string[]): any {
    if (Array.isArray(tagArray) && tagArray.length > 0) {
      return tagArray;
    } else {
      return [];
    }
  }


  async cadastrar() {

    this.validar = true;
    if (this.fGroup.valid && (this.fGroup.value.hedonica || this.fGroup.value.compra)) {
      let form = new FormData();
      var hed;
      var com;
      if (this.fGroup.value.hedonica) {
        hed = 1;
      }
      else {
        hed = 0;
      }
      if (this.fGroup.value.compra) {
        com = 1;
      }
      else {
        com = 0;
      }
      form.append("desc", this.fGroup.value.desc);
      form.append("titulo", this.fGroup.value.titulo);
      form.append("user", this.idUser);
      form.append("hedonica", hed);
      form.append("compra", com);
      if (this.fGroup.value.compra) {
        this.fGroup.value.atributosCompra = ['Atitude de Compra'];
      }
      var atributosH = [];
      form.append("atributos-compra", this.fGroup.value.atributosCompra);
      this.fGroup.value.atributosHedonica.forEach(element => {
        atributosH.push(element["value"]);
      });
      this.fGroup.value.atributosHedonica = atributosH;
      form.append("atributos-hedonica", this.fGroup.value.atributosHedonica);
      let idAnalise;
      let load = await this.loadingCtrl.create({
        message: 'Carregando',
      });
      load.present();
      await this.analiseService.saveAnalise(form).then(res => {
        console.log("respsota" + res);
        idAnalise = res["lastId"];
      }).catch(err => {
        console.error(err);
      });
      load.dismiss();
      if (confirm("Cadastrar amostras ?")) {
        this.router.navigate(["cadastrar-amostra", { id_user: this.idUser, id_analise: idAnalise }]);
      }

    }
    else {
      this.err = "Peencha todos os campos";
    }
  }
  goHome() {
    this.router.navigate(["usuario-logado", { id_user: this.idUser }]);
  }
  sair() {
    this.router.navigate(["home"]);
  }
  goPerfil() {

    this.router.navigate(["perfil", { id_user: this.idUser }]);
  }
}

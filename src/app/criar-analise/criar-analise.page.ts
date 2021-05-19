import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import { AlertController, LoadingController } from '@ionic/angular';
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
    private loadingCtrl: LoadingController, public formBuilder: FormBuilder, private router: Router,
     private nativePageTransitions: NativePageTransitions, public alertController: AlertController) {
    this.fGroup = this.formBuilder.group({
      titulo: new FormControl('', Validators.required),
      hedonica: new FormControl(''),
      compra: new FormControl(''),
      desc: new FormControl(''),
      atributosHedonica: new FormControl([]),
      atributosCompra: new FormControl([]),
      descCompra: new FormControl('Agora avalie quanto à sua atitude de compra'),
      descHedonica: new FormControl('Você está recebendo ---- amostras de -----. Avalie cada amostra e utilize a escala abaixo para identificar o quanto você gostou/desgostou ' +
      'de cada amostra quanto à ----, ----, ----, ---- e ----. Prove as amostras da esquerda para direita.'),
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
    if (this.fGroup.valid && 
      ((this.fGroup.value.hedonica && this.fGroup.value.descHedonica != '' && this.fGroup.controls.atributosHedonica.value.length > 0) 
      || (this.fGroup.value.compra && this.fGroup.value.descCompra != ''))) {
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
      form.append("desc_hed", this.fGroup.value.descHedonica);
      form.append("desc_com", this.fGroup.value.descCompra);
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
      this.presentAlert(idAnalise);

    }
    else {
      this.err = "Peencha todos os campos";
    }
  }
  goHome() {
    this.back();
    this.router.navigate(["usuario-logado", { id_user: this.idUser }]);
  }
  sair() {
    this.back();
    this.router.navigate(["home"]);
  }
  goPerfil() {
    this.nextPage();
    this.router.navigate(["perfil", { id_user: this.idUser }]);
  }

  nextPage(){
    let options: NativeTransitionOptions = {
      direction: 'left',
      duration: 400,
    }
    this.nativePageTransitions.slide(options)
      .catch(console.error);
  }
  back(){
    let options: NativeTransitionOptions = {
      direction: 'right',
      duration: 400,
    }
    this.nativePageTransitions.slide(options)
      .catch(console.error);
  }
  async presentAlert(idAnalise) {
    const alert = await this.alertController.create({
      cssClass: 'alerta',
      header: "Cadastrar amostras agora?",
      message: "Você será redirecionado para a página de cadastro de amostras",
      buttons: [
        {
          text: 'Não',
          cssClass: 'alertBtn',
          handler: () => {
            console.log('Não');
          }
        },
        {
          text: 'Sim',
          cssClass: 'alertBtn',
          handler: () => {
            this.nextPage();
            this.router.navigate(["cadastrar-amostra", { id_user: this.idUser, id_analise: idAnalise }]);
          }
        }
      ],
    });
    await alert.present();
  }
}

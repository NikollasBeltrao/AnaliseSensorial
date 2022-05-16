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
      preferencia: new FormControl(''),
      desc: new FormControl(''),
      atributosHedonica: new FormControl([]),
      atributosCompra: new FormControl([]),
      aux_atributos: new FormControl(''),
      atributosPreferencia: new FormControl([]),
      aux_atributos_preferencia: new FormControl(''),
      descCompra: new FormControl('Agora avalie quanto à sua atitude de compra'),
      descHedonica: new FormControl('Você está recebendo ---- amostras de -----. Avalie cada amostra e utilize a escala abaixo para identificar o quanto você gostou/desgostou ' +
      'de cada amostra quanto à ----, ----, ----, ---- e ----. Prove as amostras da esquerda para direita.'),
      descPreferencia: new FormControl('Você está recebendo ---- amostras de -----. Por favor, prove as amostras da esquerda para direita e selecione a mais -----.'),
    });
  }

  async ngOnInit() {
    await this.active.params.subscribe(params => {
      this.idUser = params["id_user"];
    });
  }

  alterar_atributos(){
    this.fGroup.value.atributosHedonica.splice(0, this.fGroup.value.atributosHedonica.length);
    let aux = this.fGroup.value.aux_atributos;
    if (aux.length > 0) {
      aux.split(', ').forEach(el => {
        this.fGroup.value.atributosHedonica.push({
          display: el,
          value: el
        });
      });
    }    
  }

  alterar_atributos_preferencia(){
    this.fGroup.value.atributosPreferencia.splice(0, this.fGroup.value.atributosPreferencia.length);
    let aux = this.fGroup.value.aux_atributos_preferencia;
    if (aux.length > 0) {
      aux.split(', ').forEach(el => {
        this.fGroup.value.atributosPreferencia.push({
          display: el,
          value: el
        });
      });
    }
    
  }

  upload() {
    //console.log(form.tags);
    //form.tags = this.tagArrayToString(form.tags);
    this.fGroup.value.tags[0].value = 1;
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
      || (this.fGroup.value.compra && this.fGroup.value.descCompra != '') || 
      (this.fGroup.value.preferencia && this.fGroup.value.descPreferencia != '' && this.fGroup.controls.atributosPreferencia.value.length > 0))) {
      let form = new FormData();
      var hed;
      var com;
      var pref;
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
      if (this.fGroup.value.preferencia) {
        pref = 1;
      }
      
      else {
        pref = 0;
      }
      form.append("desc", this.fGroup.value.desc);
      form.append("titulo", this.fGroup.value.titulo);
      form.append("user", this.idUser);
      form.append("hedonica", hed);
      form.append("compra", com);
      form.append("preferencia", pref);
      form.append("desc_hed", this.fGroup.value.descHedonica);
      form.append("desc_com", this.fGroup.value.descCompra);
      form.append("desc_pref", this.fGroup.value.descPreferencia);
      if (this.fGroup.value.compra) {
        this.fGroup.value.atributosCompra = ['Atitude de Compra'];
      }      
      form.append("atributos-compra", this.fGroup.value.atributosCompra);
      var atributosH = [];
      this.fGroup.value.atributosHedonica.forEach(element => {
        atributosH.push(element["value"]);
      });
      this.fGroup.value.atributosHedonica = atributosH;
      form.append("atributos-hedonica", this.fGroup.value.atributosHedonica);

      var atributosP = [];
      this.fGroup.value.atributosPreferencia.forEach(element => {
        atributosP.push(element["value"]);
      });
      this.fGroup.value.atributosPreferencia = atributosP;
      form.append("atributos-preferencia", this.fGroup.value.atributosPreferencia);

      let idAnalise;
      let load = await this.loadingCtrl.create({
        message: 'Carregando',
      });
      load.present();
      await this.analiseService.saveAnalise(form).then(res => {
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
      header: "Sucesso",
      message: "Você será redirecionado para a página de cadastro de amostras",
      buttons: [        
        {
          text: 'Ok',
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

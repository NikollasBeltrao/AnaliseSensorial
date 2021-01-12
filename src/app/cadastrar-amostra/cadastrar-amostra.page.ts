import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { AlertController, LoadingController } from '@ionic/angular';
import { AnaliseService } from 'src/services/analise.service';

@Component({
  selector: 'app-cadastrar-amostra',
  templateUrl: './cadastrar-amostra.page.html',
  styleUrls: ['./cadastrar-amostra.page.scss'],
})
export class CadastrarAmostraPage implements OnInit {
  fGroup: FormGroup;
  validar = false;
  errImg = "Escolha uma imagem";
  imagem = "../assets/default.png";
  err = "";
  idUser;
  idAnalise;
  constructor(public formBuilder: FormBuilder, private camera: Camera, private photoViewer: PhotoViewer,
    private active: ActivatedRoute, private analiseService: AnaliseService, private loadingCtrl: LoadingController,
    private router: Router, private nativePageTransitions: NativePageTransitions, public alertController: AlertController) {
    this.fGroup = this.formBuilder.group({
      nome: new FormControl('', Validators.required),
      numero: new FormControl("", Validators.compose([
        Validators.required,
        Validators.min(100),
        Validators.max(999),
        Validators.maxLength(3)
      ])),
      desc: new FormControl('', Validators.required),
    });

  }

  async ngOnInit() {
    await this.active.params.subscribe(params => {
      this.idUser = params["id_user"];
      this.idAnalise = params["id_analise"];
    });
  }

  imgFull() {
    if (this.imagem != "") {
      this.photoViewer.show(this.imagem);
    }
  }

  async cadastrar() {
    this.validar = true;
    if (this.fGroup.valid && this.imagem != '') {
      let form = new FormData();
      form.append("nome", this.fGroup.value.nome);
      form.append("numero", this.fGroup.value.numero);
      form.append("desc", this.fGroup.value.desc);
      form.append("analise", this.idAnalise);
      form.append("img", this.imagem);
      let load = await this.loadingCtrl.create({
        message: 'Carregando',
      });
      load.present();
      await this.analiseService.saveAmostra(form).then(res => {
        console.log(res);
      }, (error) => {
        console.log(error);
      }
      ).catch(console.error);
      load.dismiss();
      this.presentAlert("Cadastrar outra amostra?");

    }
  }

  async getGallery() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: false,
      targetWidth: 400,
      targetHeight: 400
    }

    await this.camera.getPicture(options)
      .then((imageData) => {
        let b = 'data:image/jpeg;base64,' + imageData;
        this.imagem = b;


        //this.analiseService.saveAalise(base64image);
      }, (error) => {
        this.errImg = error;
      })
      .catch((error) => {
        this.errImg = error;
      })

  }

  async takePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: false,
      targetWidth: 400,
      targetHeight: 400
    }

    await this.camera.getPicture(options)
      .then((imageData) => {
        let b = 'data:image/jpeg;base64,' + imageData;
        this.imagem = b;
      }, (error) => {
        this.errImg = error;
      })
      .catch((error) => {
        this.errImg = error;
      })

  }
  sair() {
    this.back();
    this.router.navigate(['home']);
  }
  goHome() {
    this.back();
    this.router.navigate(['usuario-logado', { id_user: this.idUser }]);
  }
  goPerfil() {
    this.nextPage();
    this.router.navigate(["perfil", { id_user: this.idUser }]);
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
  async presentAlert(message) {
    const alert = await this.alertController.create({
      cssClass: 'alerta',
      header: "",
      message: message,
      buttons: [
        {
          text: 'Não',
          cssClass: 'alertBtn',
          handler: () => {
            this.nextPage();
            this.goHome();
          }
        },
        {
          text: 'Sim',
          cssClass: 'alertBtn',
          handler: () => {
            this.validar = false;
            this.imagem = "../assets/default.png";
            this.fGroup.reset();

          }
        }
      ],
    });
    await alert.present();
  }
}

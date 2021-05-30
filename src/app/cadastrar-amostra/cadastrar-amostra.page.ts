import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { AlertController, LoadingController } from '@ionic/angular';
import { AnaliseService } from 'src/services/analise.service';


interface Amostra {
  nome?: string;
  desc: string;
  analise: string;
  numero: number;
  img: string;
}
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
  amostras = Array<Amostra>();
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

    this.criarAmostra();

  }

  async ngOnInit() {
    await this.active.params.subscribe(params => {
      this.idUser = params["id_user"];
      this.idAnalise = params["id_analise"];
    });
  }

  criarAmostra() {
    if (this.amostras.length === 0) {
      this.amostras.push({
        nome: '',
        desc: '',
        analise: this.idAnalise,
        numero: Math.floor(Math.random() * (999 - 100) + 100),
        img: '',
      })
    }
    else if (this.amostras.length < 5) {
      let numero = 0;
      let existe = true;
      do {
        numero = Math.floor(Math.random() * (999 - 100) + 100);
      } while (this.amostras.filter((el) => (el.numero === numero)).length > 0);
      this.amostras.push({
        nome: '',
        desc: '',
        analise: this.idAnalise,
        numero: numero,
        img: '',
      })
    }
    console.log(this.amostras);
  }
  removerAmostra(i: number) {
    if (this.amostras.length > 1) {
      this.amostras.splice(i, 1);
    }
  }

  imgFull(i: number) {
    if (this.amostras[i].img != "") {
      this.photoViewer.show(this.amostras[i].img);
    }
  }

  async cadastrar() {
    this.validar = true;
    let ok = false;
    await this.amostras.map(async (el, i)  => {

      let form = new FormData();
      form.append("nome", el.nome);
      form.append("numero", el.numero.toString());
      form.append("desc", el.desc);
      form.append("analise", this.idAnalise.toString());
      form.append("img", el.img);
      let load = await this.loadingCtrl.create({
        message: 'Carregando',
      });
      load.present();
      await this.analiseService.saveAmostra(form).then(res => {
        if (i === this.amostras.length -1) {
          this.presentAlert("Amostra(s) cadastradas com sucesso");
        }
      }, (error) => {
        console.log(error);
      }
      ).catch(console.error);
      load.dismiss();      
    })
    
  }

  async getGallery(i: number) {
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
        this.amostras[i].img = b;


        //this.analiseService.saveAalise(base64image);
      }, (error) => {
        this.errImg = error;
      })
      .catch((error) => {
        this.errImg = error;
      })

  }

  async takePicture(i: number) {
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
        this.amostras[i].img = b;
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
      header: "Sucesso",
      message: message,
      buttons: [        
        {
          text: 'OK',
          cssClass: 'alertBtn', 
          handler: () => {
            this.goHome();
          }      
        }
      ],
    });
    await alert.present();
  }
}

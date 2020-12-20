import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnaliseService } from 'src/services/analise.service';
import chartJs from 'chart.js';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
@Component({
  selector: 'app-listar-respostas',
  templateUrl: './listar-respostas.page.html',
  styleUrls: ['./listar-respostas.page.scss'],
})
export class ListarRespostasPage implements OnInit {
  analise: Array<any>;
  amostras: Array<any>;
  @ViewChild('barCanvas') barCanvas;
  @ViewChild('pieCanvas') pieCanvas;
  constructor(private analiseService: AnaliseService, private active: ActivatedRoute, private route: Router,
    private photoViewer: PhotoViewer, public loading: LoadingController, public alertController: AlertController,
    private navCtrl: NavController) { }
  barchar: any;
  barchar2: any;
  piechar: any;
  idUser = '';
  err = "";
  async ngOnInit() {
    let load = await this.loading.create({
      message: 'Carregando',
    });
    load.present();
    await this.active.params.subscribe(async params => {
      this.idUser = params['id_user'];
      await this.analiseService.getAnalise(params['id']).then(data => {
        this.analise = data;
        this.amostras = data[0].amostras;
      }, err => {
        this.presentAlert("Erro ao carregar os dados");
        this.navCtrl.back();
      })
    });
    load.dismiss();
  }

  imgFull(img) {
    this.photoViewer.show(img);
  }
  //ngAfterViewInit
  ngAfterViewIni() {
    setTimeout(() => {
      this.barchar = this.getBarChart();
      this.barchar2 = this.getBarChart();
    }, 150
    );
    setTimeout(() => {
      this.piechar = this.getPieChart();
    }, 150
    );
  }
  getChart(centext, chartType, data, options?) {
    return new chartJs(centext, {
      data,
      options,
      type: chartType
    })
  }
  getBarChart() {
    const data = {
      labels: ['Cor', 'Doçura', 'Sabor', 'Textura', 'IG'],
      datasets: [{
        label: this.amostras[0].nome_amostra,
        data: [this.amostras[0].hedonica[0].cor, this.amostras[0].hedonica[0].docura, this.amostras[0].hedonica[0].sabor, this.amostras[0].hedonica[0].textura, this.amostras[0].hedonica[0].impressaoG],
        backgroundColor: [
          'rgb(184, 8, 8)',
          'rgb(15, 11, 250)',
          'rgb(112, 8, 8)',
          'rgb(222, 8, 8)',
          'rgb(125, 11, 250)'
        ],
        boderWidth: 1
      }]
    }
    const options = {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
    return this.getChart(this.barCanvas.nativeElement, 'bar', data, options);
  }
  getPieChart() {
    const media = parseInt(this.amostras[0].hedonica[0].cor) + parseInt(this.amostras[0].hedonica[0].docura) +
      parseInt(this.amostras[0].hedonica[0].sabor) + parseInt(this.amostras[0].hedonica[0].textura) + parseInt(this.amostras[0].hedonica[0].impressaoG);
    console.log(media);
    const data = {
      labels: ['Amostra: ' + this.amostras[0].numero_amostra, 'azul'],
      datasets: [{
        data: [(media / 5), 23],
        backgroundColor: [
          'rgb(184, 8, 8)',
          'rgb(15, 11, 250)',
        ],
      }]
    }
    return this.getChart(this.pieCanvas.nativeElement, 'pie', data);
  }
  goHome() {
    this.route.navigate(["home"]);
  }
  goPerfil() {

    this.route.navigate(["perfil", { id_user: this.idUser }]);
  }

  async presentAlert(message) {
    const alert = await this.alertController.create({
      cssClass: 'alerta',
      header: "Erro",
      message: message,
      buttons: [
        {
          text: 'Ok',
          cssClass: 'alertBtn',
          handler: () => {
            console.log('ok');
          }
        }
      ],
    });
    await alert.present();
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnaliseService } from 'src/services/analise.service';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-listar-respostas',
  templateUrl: './listar-respostas.page.html',
  styleUrls: ['./listar-respostas.page.scss'],
})
export class ListarRespostasPage implements OnInit {
  analise: Array<any>;
  preferencia: any = {};
  amostras: Array<any>;
  constructor(private analiseService: AnaliseService, private active: ActivatedRoute, private route: Router,
    private photoViewer: PhotoViewer, public loading: LoadingController, public alertController: AlertController,
    private navCtrl: NavController, private nativePageTransitions: NativePageTransitions) {
    Chart.register(...registerables);
  }
  barchar: any;
  barchar2: any;
  piechar: any;
  idUser = '';
  err = "";
  bgs = ['bg-azul', 'bg-laranja', 'bg-rosa', 'bg-amarelo'];
  segment = 0;
  ngOnInit() {
    this.carregarRespostas();
  }

  segmentChanged(e) {
    console.log(this.segment);
  }

  async carregarRespostas() {
    this.preferencia = {};
    const div = <HTMLElement>document.getElementById("graficos");
    div.innerHTML = '';
    let load = await this.loading.create({
      message: 'Carregando',
    });
    load.present();
    await this.active.params.subscribe(async params => {
      this.idUser = params['id_user'];
      await this.analiseService.getAnalise(params['id']).then(data => {
        this.analise = data;
        console.log(data);
        this.preferencia = data[0].preferencia;
        this.amostras = data[0].amostras;
        if (this.preferencia != 0) {
          let respostas_p = [];
          this.preferencia.escala_resposta.forEach((er) => {
            er.respostas.forEach((r) => {
              respostas_p.push(r.valor_resposta);
            })
          })
          let resPref = [];
          let amos = [];
          this.amostras.map(a => {
            resPref.push(respostas_p.filter(x => x == a.numero_amostra).length);
            amos.push(a.numero_amostra);
          });
          this.gerarGrafico(this.preferencia.tipo_escala, resPref, this.preferencia.tipo_escala, this.bgs[this.bg(0)], amos);
        }
        data[0].amostras.forEach((am) => {
          am.escalas.forEach((es) => {
            es.atributos.forEach((at, index) => {
              let hed = [0, 0, 0, 0, 0, 0, 0, 0, 0];
              let com = [0, 0, 0, 0, 0];
              if (es.tipo_escala == 'hedonica') {
                es.escala_resposta.forEach((re) => {
                  let res = re.respostas[at.posicao_atributo - 1];
                  hed[res.valor_resposta - 1] += 1;
                })
              }
              else if (es.tipo_escala == 'compra') {
                es.escala_resposta.forEach((re) => {
                  let res = re.respostas[at.posicao_atributo - 1];
                  com[res.valor_resposta - 1] += 1;
                })
              }
              this.gerarGrafico(es.tipo_escala, (es.tipo_escala == 'hedonica' ? hed : com), "Amostra: " + am.numero_amostra + "/" + es.nome_escala + "-" + at.nome_atributo, this.bgs[this.bg(index)]);
            })
          });
        });
      }, err => {
        console.log(err)
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

  }

  doRefresh(event) {
    setTimeout(() => {
      this.carregarRespostas();
      event.target.complete();
    }, 2000);
  }

  goHome() {
    this.back();
    this.route.navigate(["usuario-logado", { id_user: this.idUser }]);
  }
  goPerfil() {
    this.nextPage();
    this.route.navigate(["perfil", { id_user: this.idUser }]);
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
  bg(i) {
    if (i >= this.bgs.length) {
      return i % this.bgs.length;
    }
    return i;
  }
  gerarGrafico(escala, data, title, cor, pref?) {
    const div = <HTMLElement>document.getElementById("graficos");
    //const div2 = <HTMLElement>document.createElement("card_g");
    const ctx = <HTMLCanvasElement>document.createElement("canvas");
    const h2 = <HTMLElement>document.createElement("div");
    h2.innerHTML = title;
    h2.className = "h2_graficos " + cor;
    h2.style.padding = '10px';
    h2.style.textAlign = 'center';
    h2.style.fontSize = '20px';
    h2.style.fontWeight = 'bold';
    h2.style.border = 'solid 1px gray';
    h2.style.borderBottom = 'none';
    //div2.className = "card_g";
    div.appendChild(h2);
    ctx.height = 400;
    ctx.width = 400;
    ctx.style.margin = '0 0 40px 0';
    ctx.style.border = 'solid 1px gray';
    ctx.style.boxShadow = "0px 1px 7px rgba(0, 0, 0, 0.45)";
    const myChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: (escala == "hedonica" ? ["Desgostei muitíssimo", "Desgostei muito", "Desgostei moderadamente", "Desgostei ligeiramente", "Nem gostei / nem desgostei",
          "Gostei ligeiramente", "Gostei moderadamente", "Gostei muito", "Gostei muitíssimo"] :
          escala == "compra" ? ["Certamente não compraria", "Provavelmente não compraria", "Tenho dúvida se compraria",
            "Provavelmente compraria", "Certamente compraria"] : pref),
        datasets: [{
          label: 'title',
          data: data,
          backgroundColor: [
            'rgb(161, 159, 165)',
            'rgb(242, 232, 218)',
            'rgb(245, 198, 200)',
            'rgb(168, 147, 192)',
            'rgb(186, 153, 114)',
            'rgb(54, 54, 45)',
            'rgb(136, 129, 164)',
            'rgb(162, 184, 212)',
            'rgb(250, 158, 147)',
            'rgb(174, 84, 89)',
          ],
          borderColor: [
            'gray',
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
    div.appendChild(ctx);
    //div.appendChild(div2);
  }
}

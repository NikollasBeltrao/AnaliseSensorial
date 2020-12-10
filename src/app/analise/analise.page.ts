import { Component, OnInit } from '@angular/core';
import { AnaliseService } from 'src/services/analise.service';
@Component({
  selector: 'app-analise',
  templateUrl: './analise.page.html',
  styleUrls: ['./analise.page.scss'],
})
export class AnalisePage implements OnInit {
  analise;
  allAnalises: Array<any>;
  amostras: Array<any>;
  escalas: Array<any>
  escolherAnalise = true;
  constructor(private analiseService: AnaliseService) {
    this.analise = {};
  }

  ngOnInit() {
    this.carregarAnalises();
  }
  sair(){
    this.escolherAnalise = true;
    this.analise = {};
    this.amostras = [];
    this.escalas = [];
  }
  async getAnalise(id) {
    await this.analiseService.getAllAnalise(id).then(data => {
      if (data[0]) {
        this.analise = data[0];
        this.amostras = data[0].amostras;
        this.escalas = data[0].amostras[0].escalas;
      }
    });
    this.escolherAnalise = false;
  }
  async carregarAnalises() {
    await this.analiseService.getActiveAnalises().then(res => {
      if(res){
        this.allAnalises = res;
      }
    });
  }
  doRefresh(event) {
    setTimeout(() => {
      this.carregarAnalises();
      event.target.complete();
    }, 2000);
  }


}

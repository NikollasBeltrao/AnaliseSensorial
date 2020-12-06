import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnaliseService } from 'src/services/analise.service';

@Component({
  selector: 'app-listar-analises',
  templateUrl: './listar-analises.page.html',
  styleUrls: ['./listar-analises.page.scss'],
})
export class ListarAnalisesPage implements OnInit {
  analises: Array<any>;
  constructor(private analiseService: AnaliseService, private route: Router) { }

  ngOnInit() {
    this.load();
  }
  load(){
    this.analiseService.getAllAnalises().then(data => {
      this.analises = data;
      console.log(data);
    });
  }
  doRefresh(event){
    setTimeout(async () => {
      await this.load();
      event.target.complete();
    }, 2000);
  }
  goToRespostas(id){
    this.route.navigate(['listar-respostas', {id: id}]);
  }

}

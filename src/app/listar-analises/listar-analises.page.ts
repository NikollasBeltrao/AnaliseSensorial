import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { error } from 'protractor';
import { AnaliseService } from 'src/services/analise.service';

@Component({
  selector: 'app-listar-analises',
  templateUrl: './listar-analises.page.html',
  styleUrls: ['./listar-analises.page.scss'],
})
export class ListarAnalisesPage implements OnInit {
  analises: Array<any>;
  goToResposta = true;
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
  switch(e, id){
    var novoStatus  = 0;
    if(e.target.checked){
      novoStatus = 1;
    }
    var form = new FormData();
    form.append("id", id);
    form.append("novoStatus", novoStatus+'');
    this.analiseService.changeStatus(form).then(res => {
      console.log(res)
    }, err => {
      alert("Erro ao alterar o status");
      if(novoStatus == 1){
        e.target.checked = false;
      }
      else {
        e.target.checked = true;
      }
    }
    );
    console.log(id);
  }

}

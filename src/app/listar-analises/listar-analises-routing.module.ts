import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListarAnalisesPage } from './listar-analises.page';

const routes: Routes = [
  {
    path: '',
    component: ListarAnalisesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListarAnalisesPageRoutingModule {}

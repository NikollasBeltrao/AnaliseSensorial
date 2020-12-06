import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListarRespostasPage } from './listar-respostas.page';

const routes: Routes = [
  {
    path: '',
    component: ListarRespostasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListarRespostasPageRoutingModule {}

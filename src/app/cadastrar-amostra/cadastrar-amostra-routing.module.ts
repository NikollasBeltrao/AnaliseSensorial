import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CadastrarAmostraPage } from './cadastrar-amostra.page';

const routes: Routes = [
  {
    path: '',
    component: CadastrarAmostraPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CadastrarAmostraPageRoutingModule {}

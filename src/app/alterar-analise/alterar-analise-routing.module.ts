import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlterarAnalisePage } from './alterar-analise.page';

const routes: Routes = [
  {
    path: '',
    component: AlterarAnalisePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlterarAnalisePageRoutingModule {}

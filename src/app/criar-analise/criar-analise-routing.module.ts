import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CriarAnalisePage } from './criar-analise.page';

const routes: Routes = [
  {
    path: '',
    component: CriarAnalisePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CriarAnalisePageRoutingModule {}

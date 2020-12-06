import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnalisePage } from './analise.page';

const routes: Routes = [
  {
    path: '',
    component: AnalisePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnalisePageRoutingModule {}

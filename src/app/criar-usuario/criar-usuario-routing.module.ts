import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CriarUsuarioPage } from './criar-usuario.page';

const routes: Routes = [
  {
    path: '',
    component: CriarUsuarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CriarUsuarioPageRoutingModule {}

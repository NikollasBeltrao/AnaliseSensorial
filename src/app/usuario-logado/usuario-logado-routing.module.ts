import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsuarioLogadoPage } from './usuario-logado.page';

const routes: Routes = [
  {
    path: '',
    component: UsuarioLogadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuarioLogadoPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListarUsuariosPage } from './listar-usuarios.page';

const routes: Routes = [
  {
    path: '',
    component: ListarUsuariosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListarUsuariosPageRoutingModule {}

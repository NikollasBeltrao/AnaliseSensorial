import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListarUsuariosPageRoutingModule } from './listar-usuarios-routing.module';

import { ListarUsuariosPage } from './listar-usuarios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ListarUsuariosPageRoutingModule
  ],
  declarations: [ListarUsuariosPage]
})
export class ListarUsuariosPageModule {}

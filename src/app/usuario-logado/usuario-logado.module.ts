import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsuarioLogadoPageRoutingModule } from './usuario-logado-routing.module';

import { UsuarioLogadoPage } from './usuario-logado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsuarioLogadoPageRoutingModule
  ],
  declarations: [UsuarioLogadoPage]
})
export class UsuarioLogadoPageModule {}

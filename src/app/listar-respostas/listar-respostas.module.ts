import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListarRespostasPageRoutingModule } from './listar-respostas-routing.module';

import { ListarRespostasPage } from './listar-respostas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListarRespostasPageRoutingModule
  ],
  declarations: [ListarRespostasPage]
})
export class ListarRespostasPageModule {}

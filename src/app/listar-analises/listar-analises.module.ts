import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListarAnalisesPageRoutingModule } from './listar-analises-routing.module';

import { ListarAnalisesPage } from './listar-analises.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListarAnalisesPageRoutingModule
  ],
  declarations: [ListarAnalisesPage]
})
export class ListarAnalisesPageModule {}

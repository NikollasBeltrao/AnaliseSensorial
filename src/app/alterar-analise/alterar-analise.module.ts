import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlterarAnalisePageRoutingModule } from './alterar-analise-routing.module';

import { AlterarAnalisePage } from './alterar-analise.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlterarAnalisePageRoutingModule
  ],
  declarations: [AlterarAnalisePage]
})
export class AlterarAnalisePageModule {}

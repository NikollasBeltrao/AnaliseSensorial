import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CadastrarAmostraPageRoutingModule } from './cadastrar-amostra-routing.module';

import { CadastrarAmostraPage } from './cadastrar-amostra.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    CadastrarAmostraPageRoutingModule
  ],
  declarations: [CadastrarAmostraPage]
})
export class CadastrarAmostraPageModule {}

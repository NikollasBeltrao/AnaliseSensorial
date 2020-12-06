import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CriarAnalisePageRoutingModule } from './criar-analise-routing.module';

import { CriarAnalisePage } from './criar-analise.page';
import { TagInputModule } from 'ngx-chips';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TagInputModule,
    ReactiveFormsModule,
    CriarAnalisePageRoutingModule
  ],
  declarations: [CriarAnalisePage]
})
export class CriarAnalisePageModule {}

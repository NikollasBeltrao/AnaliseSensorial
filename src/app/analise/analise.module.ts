import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnalisePageRoutingModule } from './analise-routing.module';

import { AnalisePage } from './analise.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnalisePageRoutingModule
  ],
  declarations: [AnalisePage]
})
export class AnalisePageModule {}

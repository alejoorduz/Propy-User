import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClasificadosPageRoutingModule } from './clasificados-routing.module';

import { ClasificadosPage } from './clasificados.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClasificadosPageRoutingModule
  ],
  declarations: [ClasificadosPage]
})
export class ClasificadosPageModule {}

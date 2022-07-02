import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaSpotsPageRoutingModule } from './lista-spots-routing.module';

import { ListaSpotsPage } from './lista-spots.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaSpotsPageRoutingModule
  ],
  declarations: [ListaSpotsPage]
})
export class ListaSpotsPageModule {}

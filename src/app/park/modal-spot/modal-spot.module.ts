import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalSpotPageRoutingModule } from './modal-spot-routing.module';

import { ModalSpotPage } from './modal-spot.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalSpotPageRoutingModule
  ],
  declarations: [ModalSpotPage]
})
export class ModalSpotPageModule {}

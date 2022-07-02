import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalRidesPageRoutingModule } from './modal-rides-routing.module';

import { ModalRidesPage } from './modal-rides.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalRidesPageRoutingModule
  ],
  declarations: [ModalRidesPage]
})
export class ModalRidesPageModule {}

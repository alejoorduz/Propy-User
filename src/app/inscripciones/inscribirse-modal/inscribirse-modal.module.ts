import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InscribirseModalPageRoutingModule } from './inscribirse-modal-routing.module';

import { InscribirseModalPage } from './inscribirse-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InscribirseModalPageRoutingModule
  ],
  declarations: [InscribirseModalPage]
})
export class InscribirseModalPageModule {}

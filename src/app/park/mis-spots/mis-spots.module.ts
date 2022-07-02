import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MisSpotsPageRoutingModule } from './mis-spots-routing.module';

import { MisSpotsPage } from './mis-spots.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MisSpotsPageRoutingModule
  ],
  declarations: [MisSpotsPage]
})
export class MisSpotsPageModule {}

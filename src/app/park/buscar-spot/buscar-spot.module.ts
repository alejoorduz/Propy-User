import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuscarSpotPageRoutingModule } from './buscar-spot-routing.module';

import { BuscarSpotPage } from './buscar-spot.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuscarSpotPageRoutingModule
  ],
  declarations: [BuscarSpotPage]
})
export class BuscarSpotPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OfrecerSpotPageRoutingModule } from './ofrecer-spot-routing.module';

import { OfrecerSpotPage } from './ofrecer-spot.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OfrecerSpotPageRoutingModule
  ],
  declarations: [OfrecerSpotPage]
})
export class OfrecerSpotPageModule {}

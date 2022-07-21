import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ControlPopupPageRoutingModule } from './control-popup-routing.module';

import { ControlPopupPage } from './control-popup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ControlPopupPageRoutingModule
  ],
  declarations: [ControlPopupPage]
})
export class ControlPopupPageModule {}

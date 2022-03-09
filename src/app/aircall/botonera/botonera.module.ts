import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BotoneraPageRoutingModule } from './botonera-routing.module';

import { BotoneraPage } from './botonera.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BotoneraPageRoutingModule
  ],
  declarations: [BotoneraPage]
})
export class BotoneraPageModule {}

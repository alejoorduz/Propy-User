import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrasteosPageRoutingModule } from './trasteos-routing.module';

import { TrasteosPage } from './trasteos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrasteosPageRoutingModule
  ],
  declarations: [TrasteosPage]
})
export class TrasteosPageModule {}

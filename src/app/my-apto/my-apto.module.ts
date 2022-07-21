import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyAptoPageRoutingModule } from './my-apto-routing.module';

import { MyAptoPage } from './my-apto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyAptoPageRoutingModule
  ],
  declarations: [MyAptoPage]
})
export class MyAptoPageModule {}

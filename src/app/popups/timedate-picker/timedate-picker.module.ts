import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TimedatePickerPageRoutingModule } from './timedate-picker-routing.module';

import { TimedatePickerPage } from './timedate-picker.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TimedatePickerPageRoutingModule
  ],
  declarations: [TimedatePickerPage]
})
export class TimedatePickerPageModule {}

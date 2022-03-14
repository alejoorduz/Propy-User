import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CitofoniaPageRoutingModule } from './citofonia-routing.module';

import { CitofoniaPage } from './citofonia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CitofoniaPageRoutingModule
  ],
  declarations: [CitofoniaPage]
})
export class CitofoniaPageModule {}

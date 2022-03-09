import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PagoadminPageRoutingModule } from './pagoadmin-routing.module';

import { PagoadminPage } from './pagoadmin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PagoadminPageRoutingModule
  ],
  declarations: [PagoadminPage]
})
export class PagoadminPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VotacionesPageRoutingModule } from './votaciones-routing.module';

import { VotacionesPage } from './votaciones.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VotacionesPageRoutingModule
  ],
  declarations: [VotacionesPage]
})
export class VotacionesPageModule {}

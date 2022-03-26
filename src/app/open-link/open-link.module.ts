import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OpenLinkPageRoutingModule } from './open-link-routing.module';

import { OpenLinkPage } from './open-link.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OpenLinkPageRoutingModule
  ],
  declarations: [OpenLinkPage]
})
export class OpenLinkPageModule {}

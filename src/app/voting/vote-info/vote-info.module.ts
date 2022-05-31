import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VoteInfoPageRoutingModule } from './vote-info-routing.module';

import { VoteInfoPage } from './vote-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VoteInfoPageRoutingModule
  ],
  declarations: [VoteInfoPage]
})
export class VoteInfoPageModule {}

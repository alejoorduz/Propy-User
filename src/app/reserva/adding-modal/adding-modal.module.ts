import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { IonicModule } from '@ionic/angular';

import { AddingModalPageRoutingModule } from './adding-modal-routing.module';

import { AddingModalPage } from './adding-modal.page';
import { NgCalendarModule  } from 'ionic2-calendar';

@NgModule({
  imports: [
    BrowserModule,
    NgCalendarModule,
    CommonModule,
    FormsModule,
    IonicModule,
    AddingModalPageRoutingModule
  ],
  declarations: [AddingModalPage]
})
export class AddingModalPageModule {}

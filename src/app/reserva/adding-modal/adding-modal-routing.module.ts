import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddingModalPage } from './adding-modal.page';

const routes: Routes = [
  {
    path: '',
    component: AddingModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddingModalPageRoutingModule {}

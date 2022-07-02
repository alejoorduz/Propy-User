import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalSpotPage } from './modal-spot.page';

const routes: Routes = [
  {
    path: '',
    component: ModalSpotPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalSpotPageRoutingModule {}

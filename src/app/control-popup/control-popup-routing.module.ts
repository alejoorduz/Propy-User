import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ControlPopupPage } from './control-popup.page';

const routes: Routes = [
  {
    path: '',
    component: ControlPopupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ControlPopupPageRoutingModule {}

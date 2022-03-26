import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OpenLinkPage } from './open-link.page';

const routes: Routes = [
  {
    path: '',
    component: OpenLinkPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OpenLinkPageRoutingModule {}

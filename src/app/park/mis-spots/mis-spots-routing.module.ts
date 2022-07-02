import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MisSpotsPage } from './mis-spots.page';

const routes: Routes = [
  {
    path: '',
    component: MisSpotsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MisSpotsPageRoutingModule {}

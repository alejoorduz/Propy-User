import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuscarSpotPage } from './buscar-spot.page';

const routes: Routes = [
  {
    path: '',
    component: BuscarSpotPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuscarSpotPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaSpotsPage } from './lista-spots.page';

const routes: Routes = [
  {
    path: '',
    component: ListaSpotsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaSpotsPageRoutingModule {}

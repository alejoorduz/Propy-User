import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrasteosPage } from './trasteos.page';

const routes: Routes = [
  {
    path: '',
    component: TrasteosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrasteosPageRoutingModule {}

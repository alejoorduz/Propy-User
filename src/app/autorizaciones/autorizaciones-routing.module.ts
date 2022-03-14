import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AutorizacionesPage } from './autorizaciones.page';

const routes: Routes = [
  {
    path: '',
    component: AutorizacionesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AutorizacionesPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CitofoniaPage } from './citofonia.page';

const routes: Routes = [
  {
    path: '',
    component: CitofoniaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CitofoniaPageRoutingModule {}

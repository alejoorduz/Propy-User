import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagoadminPage } from './pagoadmin.page';

const routes: Routes = [
  {
    path: '',
    component: PagoadminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagoadminPageRoutingModule {}

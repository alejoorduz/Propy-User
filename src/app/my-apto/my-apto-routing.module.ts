import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyAptoPage } from './my-apto.page';

const routes: Routes = [
  {
    path: '',
    component: MyAptoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyAptoPageRoutingModule {}

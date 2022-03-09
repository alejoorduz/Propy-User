import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BotoneraPage } from './botonera.page';

const routes: Routes = [
  {
    path: '',
    component: BotoneraPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BotoneraPageRoutingModule {}

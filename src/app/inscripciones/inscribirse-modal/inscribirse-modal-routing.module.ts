import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InscribirseModalPage } from './inscribirse-modal.page';

const routes: Routes = [
  {
    path: '',
    component: InscribirseModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InscribirseModalPageRoutingModule {}

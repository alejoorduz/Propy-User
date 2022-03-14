import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClasificadosPage } from './clasificados.page';

const routes: Routes = [
  {
    path: '',
    component: ClasificadosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClasificadosPageRoutingModule {}

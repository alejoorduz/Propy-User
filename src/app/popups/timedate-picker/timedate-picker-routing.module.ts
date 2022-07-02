import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TimedatePickerPage } from './timedate-picker.page';

const routes: Routes = [
  {
    path: '',
    component: TimedatePickerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TimedatePickerPageRoutingModule {}

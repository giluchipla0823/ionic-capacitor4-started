import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FirstModalPage } from './first-modal.page';

const routes: Routes = [
  {
    path: '',
    component: FirstModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FirstModalPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PartPage } from './part.page';

const routes: Routes = [
  {
    path: '',
    component: PartPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PartPageRoutingModule {}

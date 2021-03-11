import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SlideMenuPage } from './slide-menu.page';

const routes: Routes = [
  {
    path: '',
    component: SlideMenuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SlideMenuPageRoutingModule {}

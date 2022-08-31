import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeleteRechargePage } from './delete-recharge.page';

const routes: Routes = [
  {
    path: '',
    component: DeleteRechargePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeleteRechargePageRoutingModule {}

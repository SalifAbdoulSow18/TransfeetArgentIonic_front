import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeleteRechargePageRoutingModule } from './delete-recharge-routing.module';

import { DeleteRechargePage } from './delete-recharge.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeleteRechargePageRoutingModule
  ],
  declarations: [DeleteRechargePage]
})
export class DeleteRechargePageModule {}

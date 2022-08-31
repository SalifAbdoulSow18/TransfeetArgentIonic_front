import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommissionPageRoutingModule } from './commission-routing.module';

import { CommissionPage } from './commission.page';
import {AgencePageModule} from '../agence/agence.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CommissionPageRoutingModule,
        AgencePageModule
    ],
  declarations: [CommissionPage]
})
export class CommissionPageModule {}

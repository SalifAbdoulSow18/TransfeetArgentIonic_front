import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalculatorPageRoutingModule } from './calculator-routing.module';

import { CalculatorPage } from './calculator.page';
import {AgencePageModule} from '../agence/agence.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CalculatorPageRoutingModule,
        AgencePageModule
    ],
  declarations: [CalculatorPage]
})
export class CalculatorPageModule {}

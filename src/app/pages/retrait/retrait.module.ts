import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RetraitPageRoutingModule } from './retrait-routing.module';

import { RetraitPage } from './retrait.page';
import {AgencePageModule} from '../agence/agence.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RetraitPageRoutingModule,
        AgencePageModule
    ],
  declarations: [RetraitPage]
})
export class RetraitPageModule {}

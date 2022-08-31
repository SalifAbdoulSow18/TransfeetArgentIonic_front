import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SlideMenuPageRoutingModule } from './slide-menu-routing.module';

import { SlideMenuPage } from './slide-menu.page';
import {AgencePageModule} from '../agence/agence.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SlideMenuPageRoutingModule,
    AgencePageModule,
  ],
  exports: [
    SlideMenuPage
  ],
  declarations: [SlideMenuPage]
})
export class SlideMenuPageModule {}

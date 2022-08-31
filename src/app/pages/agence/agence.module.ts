import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgencePageRoutingModule } from './agence-routing.module';

import { AgencePage } from './agence.page';
import {HeaderComponent} from './header/header.component';
import {SlideMenuPageModule} from '../slide-menu/slide-menu.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgencePageRoutingModule,
  ],
  exports: [
    HeaderComponent
  ],
  declarations: [AgencePage, HeaderComponent]
})
export class AgencePageModule {}

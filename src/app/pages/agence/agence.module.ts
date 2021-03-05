import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgencePageRoutingModule } from './agence-routing.module';

import { AgencePage } from './agence.page';
import {TabsComponent} from './tabs/tabs.component';
import {HeaderComponent} from './header/header.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgencePageRoutingModule
  ],
  exports: [
    TabsComponent
  ],
  declarations: [AgencePage, TabsComponent, HeaderComponent]
})
export class AgencePageModule {}

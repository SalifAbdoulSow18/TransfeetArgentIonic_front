import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PartPageRoutingModule } from './part-routing.module';

import { PartPage } from './part.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PartPageRoutingModule
  ],
  declarations: [PartPage]
})
export class PartPageModule {}

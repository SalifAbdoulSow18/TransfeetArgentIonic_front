import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnnulerDepotPageRoutingModule } from './annuler-depot-routing.module';

import { AnnulerDepotPage } from './annuler-depot.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnnulerDepotPageRoutingModule
  ],
  declarations: [AnnulerDepotPage]
})
export class AnnulerDepotPageModule {}

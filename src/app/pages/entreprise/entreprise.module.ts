import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EntreprisePageRoutingModule } from './entreprise-routing.module';

import { EntreprisePage } from './entreprise.page';
import {ContentComponent} from './content/content.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EntreprisePageRoutingModule
  ],
    declarations: [EntreprisePage, ContentComponent]
})
export class EntreprisePageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FirstModalPageRoutingModule } from './first-modal-routing.module';

import { FirstModalPage } from './first-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FirstModalPageRoutingModule
  ],
  declarations: [FirstModalPage]
})
export class FirstModalPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InitialPagePageRoutingModule } from './initial-page-routing.module';

import { InitialPagePage } from './initial-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InitialPagePageRoutingModule
  ],
  declarations: [InitialPagePage]
})
export class InitialPagePageModule {}

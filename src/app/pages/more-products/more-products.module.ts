import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MoreProductsPageRoutingModule } from './more-products-routing.module';
// import {CardComponent} from '../../components/card/card.component'
import {ComponentsModule} from '../../components/component.module'
import { MoreProductsPage } from './more-products.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MoreProductsPageRoutingModule,
    ComponentsModule
  ],
  declarations: [MoreProductsPage]
})
export class MoreProductsPageModule {}

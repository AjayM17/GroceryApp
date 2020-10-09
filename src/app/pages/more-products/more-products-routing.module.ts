import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoreProductsPage } from './more-products.page';

const routes: Routes = [
  {
    path: '',
    component: MoreProductsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoreProductsPageRoutingModule {}

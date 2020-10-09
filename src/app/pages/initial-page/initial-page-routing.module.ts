import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InitialPagePage } from './initial-page.page';

const routes: Routes = [
  {
    path: '',
    component: InitialPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InitialPagePageRoutingModule {}

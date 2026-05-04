import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DealsListPage } from './pages/deals-list/deals-list.component';

const routes: Routes = [
  {
    path: '',
    component: DealsListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DealsRoutingModule { }
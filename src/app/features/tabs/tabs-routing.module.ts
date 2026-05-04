import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'main', 
    component: TabsPage,
    children: [
      {
        path: 'deals',
        loadChildren: () => import('../deals/deals-module').then(m => m.DealsModule)
      },
      {
        path: 'favorites',
        loadChildren: () => import('../favorites/favorites-module').then(m => m.FavoritesModule)
      },
      {
        path: '',
        redirectTo: '/main/deals',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/main/deals',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
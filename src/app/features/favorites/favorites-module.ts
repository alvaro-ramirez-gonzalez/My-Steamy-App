import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FavoritesRoutingModule } from './favorites-routing-module';
import { FavoritesListPage } from './pages/favorites-list/favorites-list.component';
import { SharedModule } from '../../shared/shared-module';

@NgModule({
  declarations: [FavoritesListPage],
  imports: [
    CommonModule,
    IonicModule,
    SharedModule, 
    FavoritesRoutingModule
  ]
})
export class FavoritesModule { }
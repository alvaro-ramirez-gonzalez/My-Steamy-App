import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { IonicModule } from '@ionic/angular'; 
import { FormsModule } from '@angular/forms'; 
import { DealsRoutingModule } from './deals-routing-module';
import { SharedModule } from '../../shared/shared-module';

import { DealsListPage } from './pages/deals-list/deals-list.component';
import { DealCardComponent } from './components/deal-card/deal-card.component';
import { GameDetailsComponent } from './components/game-details/game-details.component';

@NgModule({
  declarations: [
    DealsListPage,
    DealCardComponent,
    GameDetailsComponent
  ],
  imports: [
    CommonModule,     
    IonicModule,    
    FormsModule,     
    SharedModule,      
    DealsRoutingModule 
  ],
  providers: []
})
export class DealsModule { }
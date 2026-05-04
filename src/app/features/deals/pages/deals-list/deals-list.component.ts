import { Component, OnInit, inject } from '@angular/core';
import { ModalController } from '@ionic/angular'; 
import { DealsService } from '../../services/deals'; 
import { UserStore } from '../../../../core/stores/user.store'; 
import { CheapSharkDeal } from '../../../../core/models/api-response.model';
import { GameDetailsComponent } from '../../components/game-details/game-details.component';

@Component({
 selector: 'app-deals-list',
  templateUrl: './deals-list.component.html', 
  styleUrls: ['./deals-list.component.scss'],  
  standalone: false
})
export class DealsListPage implements OnInit {
  public dealsSvc = inject(DealsService);
  public userStore = inject(UserStore);
  private modalCtrl = inject(ModalController);

  ngOnInit() {
    this.loadInitialData();
  }

  private loadInitialData() {
    try {
      this.dealsSvc.fetchDeals();
    } catch (error) {
      console.error('Error en carga inicial:', error);
    }
  }

  onSearch(event: any) {
    const query = event?.detail?.value?.trim() ?? '';
    this.dealsSvc.fetchDeals(query);
  }

  async openDetails(deal: CheapSharkDeal) {
    if (!deal) return;
    try {
      const modal = await this.modalCtrl.create({
        component: GameDetailsComponent, 
        componentProps: { deal },
        initialBreakpoint: 0.7,
        breakpoints: [0, 0.7, 0.9],
        handle: true,
        mode: 'ios'
      });
      await modal.present();
    } catch (error) {
      console.error('Error al abrir el modal:', error);
    }
  }


  getStoreLogo(storeId: string): string {
    const id = Number(storeId) - 1;
    return `https://www.cheapshark.com/img/stores/icons/${id}.png`;
  }
}
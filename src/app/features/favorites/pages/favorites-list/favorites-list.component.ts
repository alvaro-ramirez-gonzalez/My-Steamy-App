import { Component, inject, OnInit } from '@angular/core';
import { UserStore } from '../../../../core/stores/user.store';
import { CheapSharkDeal } from '../../../../core/models/api-response.model';
import { FavoritesService } from '../../services/favorites';

@Component({
  selector: 'app-favorites-list',
  templateUrl: './favorites-list.component.html',
  styleUrls: ['./favorites-list.component.scss'],
  standalone: false
})
export class FavoritesListPage implements OnInit {
  public userStore = inject(UserStore);
  private favoritesService = inject(FavoritesService);

  async ngOnInit() {
   
    await this.syncWidget();

    setTimeout(() => this.syncWidget(), 500);
    setTimeout(() => this.syncWidget(), 1500);
  }

  
  private async syncWidget() {
    const currentFavs = this.userStore.favorites();
    if (currentFavs && currentFavs.length > 0) {
      console.log('🔄 Sincronizando primer favorito al widget:', currentFavs[0].title);
      await this.setAsWidgetFavorite(currentFavs[0]);
    } else {
      console.warn('⚠️ No se encontraron favoritos para sincronizar con el widget aún.');
    }
  }

  async setAsWidgetFavorite(deal: CheapSharkDeal) {
    
    const gameData = {
      name: deal.title || (deal as any).external || 'Juego desconocido',
      price: deal.salePrice || '0.00',
      discount: deal.savings ? Math.round(parseFloat(deal.savings)).toString() : "0",
      image: deal.thumb || '',
      storeIcon: deal.storeID 
        ? `https://www.cheapshark.com/img/stores/logos/${parseInt(deal.storeID) - 1}.png`
        : ''
    };
    
    try {
      await this.favoritesService.updateWidget(gameData);
      console.log('Widget sincronizado con:', gameData.name);
    } catch (error) {
      console.error('Error sincronizando widget:', error);
    }
  }

  async openDetails(deal: CheapSharkDeal) {
    if (!deal || !deal.dealID) return;
    try {
      const { Browser } = await import('@capacitor/browser');
      await Browser.open({ 
        url: `https://www.cheapshark.com/redirect?dealID=${deal.dealID}` 
      });
    } catch (error) {
      console.error('Error al abrir el navegador:', error);
      window.open(`https://www.cheapshark.com/redirect?dealID=${deal.dealID}`, '_blank');
    }
  }
}
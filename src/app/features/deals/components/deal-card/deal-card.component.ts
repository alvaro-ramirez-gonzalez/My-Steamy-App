import { Component, Input, inject } from '@angular/core';
import { CheapSharkDeal } from '../../../../core/models/api-response.model';
import { Browser } from '@capacitor/browser';
import { UserStore } from '../../../../core/stores/user.store'; 
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-deal-card',
  templateUrl: './deal-card.component.html',
  styleUrls: ['./deal-card.component.scss'],
  standalone: false
})
export class DealCardComponent {
  
  public userStore = inject(UserStore);
  private toastCtrl = inject(ToastController);

  @Input({ required: true }) deal!: CheapSharkDeal;

  async openDeal() {
    const url = `https://www.cheapshark.com/redirect?dealID=${this.deal.dealID}`;
    await Browser.open({ url });  
  }

  async toggleFavorite() {
    
    this.userStore.toggleFavorite(this.deal);

    
    const isFav = this.userStore.isFavorite(this.deal.dealID);
    const message = isFav 
      ? `${this.deal.title} añadido a favoritos` 
      : `${this.deal.title} eliminado de favoritos`;

    
    const toast = await this.toastCtrl.create({
      message,
      duration: 1500,
      position: 'bottom',
      color: isFav ? 'success' : 'medium',
      mode: 'ios'
    });
    await toast.present();
  }

  
  getRatingColor(score: string) {
    const s = parseInt(score);
    if (isNaN(s)) return 'medium'; 
    if (s >= 80) return 'success';
    if (s >= 60) return 'warning';
    return 'danger';
  }
}
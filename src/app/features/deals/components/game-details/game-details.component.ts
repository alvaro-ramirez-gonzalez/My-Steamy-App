import { Component, Input, inject } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CheapSharkDeal } from '../../../../core/models/api-response.model';
import { Browser } from '@capacitor/browser';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.scss'],
  standalone: false 
})
export class GameDetailsComponent {
  private modalCtrl = inject(ModalController);

  @Input() deal!: CheapSharkDeal; 

  dismiss() {
    this.modalCtrl.dismiss();
  }

  async openStore() {
    if (this.deal && this.deal.dealID) {
      await Browser.open({ 
        url: `https://www.cheapshark.com/redirect?dealID=${this.deal.dealID}` 
      });
    }
  }
}
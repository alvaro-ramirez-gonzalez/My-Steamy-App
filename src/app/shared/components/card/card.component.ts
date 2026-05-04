import { Component, Input, inject } from '@angular/core';
import { CheapSharkDeal } from '../../../core/models/api-response.model';
import { UserStore } from '../../../core/stores/user.store';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  standalone: false
})
export class CardComponent {
  public userStore = inject(UserStore);

  
  @Input() deal!: CheapSharkDeal; 

  toggleFav(event: Event) {
    event.stopPropagation();
    if (this.deal) {
      this.userStore.toggleFavorite(this.deal);
    }
  }
}
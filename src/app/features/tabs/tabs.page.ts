import { Component, inject } from '@angular/core';
import { UserStore } from '../../core/stores/user.store';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone: false
})
export class TabsPage {
  public userStore = inject(UserStore); 
}
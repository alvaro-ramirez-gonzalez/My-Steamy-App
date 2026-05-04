import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({ providedIn: 'root' })
export class StorageService {
  constructor() {}

  async setFavorite(game: { name: string, price: string, image: string }): Promise<void> {
    
    await Preferences.set({ key: 'widget_title', value: game.name });
    await Preferences.set({ key: 'widget_price', value: game.price });
    await Preferences.set({ key: 'widget_image_url', value: game.image });
    console.log('¡Datos enviados al disco!');
  }


  async getFavorite() {
    const { value } = await Preferences.get({ key: 'widget_title' });
    return value;
  }
}
import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  public async updateWidget(game: any) {
    if (!game) return;
    try {
      
      await Preferences.set({ key: 'w_title', value: game.name });
      await Preferences.set({ key: 'w_price', value: game.price.toString() });
      await Preferences.set({ key: 'w_discount', value: game.discount.toString() });
      await Preferences.set({ key: 'w_image', value: game.image });
      
      console.log(" Datos guardados para el Widget:", game.name);
    } catch (e) {
      console.error(" Error al guardar en nativo:", e);
    }
  }
}
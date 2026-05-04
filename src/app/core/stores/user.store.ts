  import { Injectable, signal, computed, effect } from '@angular/core';
  import { CheapSharkDeal } from '../models/api-response.model';

  @Injectable({ providedIn: 'root' })
  export class UserStore {

    #state = signal({
      user: null as any,
    
      favorites: JSON.parse(localStorage.getItem('favorites') || '[]') as CheapSharkDeal[],
      lastSearch: ''
    });

    constructor() {
      
      effect(() => {
        localStorage.setItem('favorites', JSON.stringify(this.#state().favorites));
      });
    }


    readonly favorites = computed(() => this.#state().favorites);
    readonly favoritesCount = computed(() => this.#state().favorites.length);
    readonly currentUser = computed(() => this.#state().user);

    toggleFavorite(deal: CheapSharkDeal) {
      this.#state.update((s) => {
        const isFavorite = s.favorites.some((f) => f.dealID === deal.dealID);
        
        const newFavorites = isFavorite
          ? s.favorites.filter((f) => f.dealID !== deal.dealID) 
          : [...s.favorites, deal];

        return { ...s, favorites: newFavorites };
      });
    }

    clearFavorites() {
      this.#state.update((s) => ({ ...s, favorites: [] }));
    }

    isFavorite(dealId: string): boolean {
      return this.#state().favorites.some((f) => f.dealID === dealId);
    }

    
    clearStore() {
      this.#state.set({
        user: null,
        favorites: [],
        lastSearch: ''
      });
      localStorage.removeItem('favorites');
    }
  }
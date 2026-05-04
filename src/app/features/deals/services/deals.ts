import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CheapSharkDeal } from '../../../core/models/api-response.model';
import { finalize } from 'rxjs';

@Injectable({
  providedIn: 'root' 
})
export class DealsService {
  private http = inject(HttpClient);
  private readonly API_URL = 'https://www.cheapshark.com/api/1.0';

  #deals = signal<CheapSharkDeal[]>([]);
  #loading = signal<boolean>(false);
  
  public readonly deals = this.#deals.asReadonly();
  public readonly isLoading = this.#loading.asReadonly();

  fetchDeals(title?: string) {
    this.#loading.set(true);

    
    let params = new HttpParams().set('pageSize', '30'); 
    
    if (title && title.trim().length > 0) {
      params = params.set('title', title.trim());
    }

    this.http.get<CheapSharkDeal[]>(`${this.API_URL}/deals`, { params })
      .pipe(
        finalize(() => this.#loading.set(false))
      )
      .subscribe({
        next: (data) => {
          console.log('API Response:', data); 
          if (Array.isArray(data)) {
            this.#deals.set(data);
          } else {
            this.#deals.set([]);
          }
        },
        error: (err) => {
          console.error('Error fetching deals:', err);
          this.#deals.set([]);
        }
      });
  }
}
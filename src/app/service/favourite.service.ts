import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const api = 'http://localhost:3000/api';

@Injectable({
  providedIn: 'root'
})

export class FavouriteService {

  constructor(
    private http: HttpClient
  ) { }

  getFavouriteProduct(acc_id: any) {
    return this.http.get(`${api}/favourite/${acc_id}`);
  }

  checkFavourite(data: any) {
    return this.http.get(`${api}/check-favourite/${data.account_id}/${data.product_id}`);
  }

  addFavourite(data: any) {
    return this.http.post(`${api}/add-favourite`, data);
  }

  removeFavourite(data: any) {
    return this.http.delete(`${api}/remove-favourite`, {
      body: data
    });
  }
}

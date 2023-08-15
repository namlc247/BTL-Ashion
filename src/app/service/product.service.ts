import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const api = 'http://localhost:3000/api';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  constructor(private http: HttpClient) { }

  getProduct(data: any = {}) {
    let url: any = '';

    url += data.category_id ? `cat_id=${data.category_id}&` : '';
    url += data.search ? `search=${data.search}&` : '';
    url += data.limit ? `limit=${data.limit}&` : '';
    url += data.sort ? `sort=${data.sort}&order=${data.order}&` : '';
    // url += data.account_id ? `account_id=${data.account_id}&` : '';

    return this.http.get(`${api}/product?${url}`);
  }

  getProductById(id: number) {
    return this.http.get(`${api}/product/${id}`);
  }
}

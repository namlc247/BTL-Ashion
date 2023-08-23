import { Injectable, OnInit } from '@angular/core';
import { NotificationService } from './notification.service';
import { AccountService } from './account.service';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';

const api = 'http://localhost:3000/api';

@Injectable({
  providedIn: 'root'
})
export class CartService implements OnInit {

  constructor(
    private http: HttpClient,
    private notificationSrv: NotificationService,
  ) { }

  ngOnInit(): void {

  }

  getCartData(account_id: any) {
    return this.http.get(`${api}/cart/${account_id}`);
  }

  checkPrdExits(account_id: any, prd_id: any) {
    return this.http.get(`${api}/check-cart/${account_id}/${prd_id}`);
  }

  // getTotalCart(acc_id: any) {
  //   return this.http.get(`${api}/total-cart/${acc_id}`);
  // }

  getTotalPrice(acc_id: any) {
    return this.http.get(`${api}/total-price/${acc_id}`);
  }

  addCart(data: any) {
    return this.http.post(`${api}/add-cart`, data);
  }

  removeFromCart(data: any) {
    this.notificationSrv.showError('', 'Removed!');

    return this.http.delete(`${api}/remove-cart`, {
      body: data
    });
  }

  updateQuantity(data: any) {
    return this.http.put(`${api}/update-cart`, data);
  }
}

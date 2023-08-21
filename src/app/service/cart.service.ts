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

  private saveJson(cart: any, account_id: any) {
    let cartJson = JSON.stringify(cart);
    sessionStorage.setItem(`cart${account_id}`, cartJson);
  }

  getCartData(account_id: any) {
    let cartJson: any = sessionStorage.getItem(`cart${account_id}`);
    let cart: any = []
    if (cartJson) {
      cart = JSON.parse(cartJson);
    }
    return cart;
    // return this.http.get(`${api}/favourite/${account_id}`);
  }

  checkPrdExits(prd: any, data: any) {
    return data.findIndex((item: any) => {
      return prd.id == item.id;
    })

    // return this.http.get(`${api}/check-cart/${data.account_id}/${data.product_id}`);
  }

  getTotalQtt(account_id: any) {
    let t = 0;

    let cart = this.getCartData(account_id);

    cart.forEach((item: any) => {
      t += parseFloat(item.quantity);
    });

    return t;
  }

  getTotalCart(acc_id: any) {
    return this.http.get(`${api}/total-cart/${acc_id}`);
  }

  saveCartData(prd: any, account_id: any) {
    let cart = this.getCartData(account_id);
    let index = this.checkPrdExits(prd, cart);

    if (index == -1) {
      prd.quantity = 1;
      cart.push(prd);
    } else {
      cart[index].quantity = parseFloat(cart[index].quantity) + 1;
    }

    this.saveJson(cart, account_id);
    this.notificationSrv.showSuccess('Add to Cart', 'Success!');

    // return this.http.post(`${api}/add-cart`, data);
  }

  removeFromCart(index: any, account_id: any) {
    let cart = this.getCartData(account_id);

    cart.splice(index, 1);

    this.saveJson(cart, account_id);
    this.notificationSrv.showError('', 'Removed!');

    // this.notificationSrv.showError('', 'Removed!');

    // return this.http.delete(`${api}/remove-favourite`, {
    //   body: data
    // });
  }

  updateQuantity(index: any, quantity: number, account_id: any) {
    let cart = this.getCartData(account_id);

    cart[index].quantity = quantity;

    this.saveJson(cart, account_id);

    // return this.http.put(`${api}/update-cart`, data);
  }
}

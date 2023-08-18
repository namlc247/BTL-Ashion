import { Injectable, OnInit } from '@angular/core';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class CartService implements OnInit {

  constructor(
    private notificationSrv: NotificationService
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
  }

  checkPrdExits(prd: any, data: any) {
    return data.findIndex((item: any) => {
      return prd.id == item.id;
    })
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
  }

  removeFromCart(index: any, account_id: any) {
    let cart = this.getCartData(account_id);

    cart.splice(index, 1);

    this.saveJson(cart, account_id);
    this.notificationSrv.showError('', 'Removed!');
  }

  updateQuantity(index: any, quantity: number, account_id: any) {
    let cart = this.getCartData(account_id);

    cart[index].quantity = quantity;

    this.saveJson(cart, account_id);
  }
}

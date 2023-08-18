import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/service/account.service';
import { CartService } from 'src/app/service/cart.service';
import { NotificationService } from 'src/app/service/notification.service';
declare var $: any;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  checkLogin: boolean = false;
  account: any = {};
  cart: any = {}
  subtotal: number = 0;

  constructor(
    private accServive: AccountService,
    private cartService: CartService,
    private notificationSrv: NotificationService
  ) { }

  ngOnInit(): void {
    this.account = this.accServive.getAccountInStorage();
    this.checkLogin = this.account ? true : false;

    this.cart = this.cartService.getCartData(this.account.id);

    this.subtotal = 0;
    for (const item of this.cart) {
      this.subtotal += item.final_price * item.quantity;
    }
  }

  removeCart(index: any) {
    this.cartService.removeFromCart(index, this.account.id);
    this.cart = this.cartService.getCartData(this.account.id);
  }

  updateQuantity(e: any, index: any) {
    this.cartService.updateQuantity(index, e.target.value, this.account.id);
  }

  updateCart() {
    this.cart = this.cartService.getCartData(this.account.id);

    this.subtotal = 0;
    for (const item of this.cart) {
      this.subtotal += item.final_price * item.quantity;
    }

    this.notificationSrv.showSuccess('', 'Update Success!');
  }
}

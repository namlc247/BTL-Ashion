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
  cart: any = [];
  subtotal: number = 0;

  constructor(
    private accServive: AccountService,
    private cartService: CartService,
    private notificationSrv: NotificationService
  ) { }

  ngOnInit(): void {
    this.account = this.accServive.getAccountInStorage();
    this.checkLogin = this.account ? true : false;

    this.getCart(this.account.id);

    this.cartService.getTotalPrice(this.account.id).subscribe((res: any) => {
      this.subtotal = res.result;
    })

  }

  getCart(account_id: number) {
    this.cartService.getCartData(account_id).subscribe((res: any) => {
      this.cart = res.result;
    })
  }

  removeCart(prd_id: any) {
    let data = {
      account_id: this.account.id,
      product_id: prd_id
    }

    this.cartService.removeFromCart(data).subscribe();
    this.getCart(this.account.id);
  }

  changeQuantity(e: any, product_id: any) {
    let data = {
      quantity: e.target.value,
      product_id: product_id,
      account_id: this.account.id
    }
    this.cartService.updateQuantity(data).subscribe();
  }

  updateCart() {
    this.notificationSrv.showSuccess('', 'Updated!');
    this.getCart(this.account.id);
    this.cartService.getTotalPrice(this.account.id).subscribe((res: any) => {
      this.subtotal = res.result;
    })
  }
}

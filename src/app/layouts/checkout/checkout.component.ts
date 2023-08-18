import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/service/account.service';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cart: any = [];
  account: any = {};
  subtotal: number = 0;

  constructor(
    private cartService: CartService,
    private accServive: AccountService,
  ) { }

  ngOnInit(): void {
    this.account = this.accServive.getAccountInStorage();
    this.cart = this.cartService.getCartData(this.account.id);

    this.subtotal = 0;
    for (const item of this.cart) {
      this.subtotal += item.final_price * item.quantity;
    }
  }

}

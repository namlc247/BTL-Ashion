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

    this.cartService.getCartData(this.account.id).subscribe((res: any) => {
      this.cart = res.result;
    })

    this.cartService.getTotalPrice(this.account.id).subscribe((res: any) => {
      this.subtotal = res.result;
    })
  }

}

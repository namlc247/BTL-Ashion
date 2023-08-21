import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartService } from './cart.service';
import { AccountService } from './account.service';

@Injectable()
export class DataService {

  public data = new BehaviorSubject<any>({
    account: {},
    cartQtt: 0
  });

  constructor(
    private cartService: CartService,
    private accountService: AccountService
  ) {
    this.data.next({
      account: this.accountService.getAccountInStorage(),
      cartQtt: this.cartService.getTotalQtt(this.accountService.getAccountInStorage().id)
    });
  }

  saveChange(data: any) {
    this.data.next(data);
  }

}

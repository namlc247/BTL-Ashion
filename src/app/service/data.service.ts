import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartService } from './cart.service';
import { AccountService } from './account.service';
import { FavouriteService } from './favourite.service';

@Injectable()
export class DataService {
  private account: any = {};

  public data = new BehaviorSubject<any>({
    favouriteQtt: 0
  });

  constructor(
    private accountService: AccountService,
    private cartService: CartService,
    private favouriteService: FavouriteService,
  ) {
    this.account = this.accountService.getAccountInStorage();

    // if (this.account) {
    //   this.cartQtt = this.cartService.getTotalQtt(this.account.id);

    //   this.data.next({
    //     cartQtt: this.cartQtt,
    //   });
    // }

    if (this.account) {
      this.favouriteService.getTotalFavourite(this.account.id).subscribe((res: any) => {
        this.data.next({
          favouriteQtt: res.result
        })
      })
    }
  }

  saveChange(data: any) {
    this.data.next(data);
  }

}

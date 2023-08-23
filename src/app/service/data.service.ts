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

  public dataCart = new BehaviorSubject<any>({
    cartQtt: 0
  });

  constructor() { }

  saveChange(data: any) {
    this.data.next(data);
  }

  saveCartChange(data: any) {
    this.dataCart.next(data);
  }
}

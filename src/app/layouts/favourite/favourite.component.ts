import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/service/account.service';
import { CartService } from 'src/app/service/cart.service';
import { FavouriteService } from 'src/app/service/favourite.service';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.css']
})
export class FavouriteComponent implements OnInit {
  products: any = [];
  account: any = {};

  constructor(
    private favouriteService: FavouriteService,
    private accServive: AccountService,
    private cartService: CartService
  ) { }

  getFavouriteData(acc_id: any) {
    this.favouriteService.getFavouriteProduct(acc_id).subscribe((res: any) => {
      this.products = res.result;
    })
  }

  ngOnInit(): void {
    this.account = this.accServive.getAccountInStorage();
    this.getFavouriteData(this.account.id)
  }


  removeFavourite(prd_id: any) {
    this.account = this.accServive.getAccountInStorage();

    let data = {
      account_id: this.account.id,
      product_id: prd_id
    }

    this.favouriteService.removeFavourite(data).subscribe((res: any) => {
      this.getFavouriteData(this.account.id);
    });
  }

  addCart(prd: any) {
    this.cartService.saveCartData(prd, this.account.id);
  }
}

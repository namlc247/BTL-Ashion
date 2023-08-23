import { Component, OnInit } from '@angular/core';
import { NotificationService } from './service/notification.service';
import { AccountService } from './service/account.service';
import { CartService } from './service/cart.service';
import { FavouriteService } from './service/favourite.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  account: any = {}

  constructor(
    private notificationSrv: NotificationService,
    private cartService: CartService,
    private favouriteService: FavouriteService,
    private accSrv: AccountService,
  ) { }

  ngOnInit(): void {
    this.account = this.accSrv.getAccountInStorage();
    if (this.account) {
      this.notificationSrv.showInfo(`Hello ${this.account.name}`, 'Login Success!');
      this.cartService.dataToTalcart(this.account.id);
      this.favouriteService.dataToTalFavourite(this.account.id);
    }
  }

}

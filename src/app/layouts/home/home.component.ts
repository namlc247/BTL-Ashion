import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/service/account.service';
import { CartService } from 'src/app/service/cart.service';
import { DataService } from 'src/app/service/data.service';
import { FavouriteService } from 'src/app/service/favourite.service';
import { NotificationService } from 'src/app/service/notification.service';
import { ProductService } from 'src/app/service/product.service';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: any = [];
  checkLogin: boolean = false;
  account: any = {};

  urlData: any = {};

  constructor(
    private dataService: DataService,
    private prdService: ProductService,
    private favouriteService: FavouriteService,
    private accServive: AccountService,
    private cartService: CartService,
    private notificationSrv: NotificationService
  ) { }

  getProductData(data: any = {}) {
    this.prdService.getProduct(data).subscribe((res: any) => {
      this.products = res.result;

      if (this.account) {
        for (const prd of this.products) {
          let data: any = {
            account_id: this.account.id,
            product_id: prd.id
          }

          this.favouriteService.checkFavourite(data).subscribe((res: any) => {
            prd.checkFavourite = res.result;
          })
        }
      }
    });
  }

  ngOnInit(): void {
    this.account = this.accServive.getAccountInStorage();
    this.checkLogin = this.account ? true : false;

    this.urlData.limit = 8;

    this.getProductData(this.urlData);

    $(".banner__slider").owlCarousel({
      loop: true,
      margin: 0,
      items: 1,
      dots: true,
      smartSpeed: 1200,
      autoHeight: false,
      autoplay: true
    });
  }

  addFavourite(prd_id: any) {
    if (!this.checkLogin) {
      this.notificationSrv.showWarning('', 'You have to Log In!');
      return;
    } else {
      let data = {
        account_id: this.account.id,
        product_id: prd_id
      }

      this.favouriteService.addFavourite(data).subscribe(() => {
        this.getProductData(this.urlData);

        this.favouriteService.dataToTalFavourite(this.account.id);
      });

    }
  }

  removeFavourite(prd_id: any) {
    let data = {
      account_id: this.account.id,
      product_id: prd_id
    }

    this.favouriteService.removeFavourite(data).subscribe(() => {
      this.getProductData(this.urlData);

      this.favouriteService.dataToTalFavourite(this.account.id);
    });
  }

  addCart(prd_id: any) {
    if (!this.checkLogin) {
      this.notificationSrv.showWarning('', 'You have to Log In!');
    } else {
      this.cartService.checkPrdExits(this.account.id, prd_id).subscribe((res: any) => {
        let quantity = res.result;

        if (quantity > 0) {
          let data = {
            quantity: quantity + 1,
            account_id: this.account.id,
            product_id: prd_id
          }
          this.cartService.updateQuantity(data).subscribe(() => {
            this.cartService.dataToTalcart(this.account.id);
          });
        } else {
          let data = {
            account_id: this.account.id,
            product_id: prd_id
          }
          this.cartService.addCart(data).subscribe(() => {
            this.cartService.dataToTalcart(this.account.id);
          });
        }

        this.notificationSrv.showSuccess('', 'Added to Cart!')
      });
    }
  }
}

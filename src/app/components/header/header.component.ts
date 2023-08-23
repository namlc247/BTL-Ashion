import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/service/account.service';
import { CartService } from 'src/app/service/cart.service';
import { DataService } from 'src/app/service/data.service';
import { FavouriteService } from 'src/app/service/favourite.service';
import { NotificationService } from 'src/app/service/notification.service';

declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  checkLogin: boolean = false;
  account: any = {};
  totalCart: number = 0;
  totalFavourite: number = 0;

  constructor(
    private router: Router,
    private accServive: AccountService,
    private notificationSrv: NotificationService,
    private dataService: DataService
  ) { }


  ngOnInit(): void {
    this.account = this.accServive.getAccountInStorage();
    this.checkLogin = this.account ? true : false;

    this.dataService.data.subscribe((res: any) => {
      this.totalFavourite = res.favouriteQtt;
    })

    this.dataService.dataCart.subscribe((res: any) => {
      this.totalCart = res.cartQtt
    })

    $(".canvas__open").on('click', function () {
      $(".offcanvas-menu-wrapper").addClass("active");
      $(".offcanvas-menu-overlay").addClass("active");
    });

    $(".offcanvas-menu-overlay, .offcanvas__close").on('click', function () {
      $(".offcanvas-menu-wrapper").removeClass("active");
      $(".offcanvas-menu-overlay").removeClass("active");
    });

    $(".header__menu").slicknav({
      prependTo: '#mobile-menu-wrap',
      allowParentLinks: true
    });
  }

  logOut() {
    this.checkLogin = false;
    sessionStorage.removeItem('login');
    location.assign('/login')
  }

  goToFavourite() {
    if (!this.checkLogin) {
      this.notificationSrv.showWarning('', 'You have to Log In!');
      return;
    } else {
      this.router.navigate(['/favourite', this.account.name]);
    }
  }

  goToCart() {
    if (!this.checkLogin) {
      this.notificationSrv.showWarning('', 'You have to Log In!');
      return;
    } else {
      this.router.navigate(['/cart']);
    }
  }
}

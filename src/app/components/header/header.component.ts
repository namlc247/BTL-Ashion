import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/service/account.service';

declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  checkLogin: boolean = false;
  account: any = {};

  constructor(
    private router: Router,
    private accServive: AccountService
  ) { }


  ngOnInit(): void {
    this.account = this.accServive.getAccountInStorage();
    this.checkLogin = this.account ? true : false;

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
    alert('Logged out');
    location.assign('/');
  }

  goToFavourite() {
    if (!this.checkLogin) {
      alert('You are not logged into your account');
      return;
    } else {
      this.router.navigate(['/favourite', this.account.name]);
    }
  }
}

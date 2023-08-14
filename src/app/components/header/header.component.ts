import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  check: boolean = false;
  account: any = {};

  constructor(private router: Router) { }


  ngOnInit(): void {
    let jsonData = sessionStorage.getItem('login');
    if (jsonData) {
      this.check = true;
      this.account = JSON.parse(jsonData);
    }

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
    this.check = false;
    sessionStorage.removeItem('login');
    alert('You are Logged out');
  }
}

import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: any = [];

  constructor(
    private prdService: ProductService,
  ) { }

  ngOnInit(): void {
    let urlData: any = {};
    urlData.limit = 8;

    this.prdService.getProduct(urlData).subscribe((res: any) => {
      this.products = res.result;
    });

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
}

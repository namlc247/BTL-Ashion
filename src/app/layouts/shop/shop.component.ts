import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  products: any = [];

  constructor(private prdService: ProductService) { }

  ngOnInit(): void {

    this.prdService.getProduct().subscribe((res: any) => {
      this.products = res.result;
    });

  }

}

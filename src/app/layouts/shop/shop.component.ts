import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CategoryService } from 'src/app/service/category.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  sortType: string = 'Sort By';
  categories: any = [];
  products: any = [];
  urlData: any = {};

  searchForm: FormGroup = new FormGroup({
    name: new FormControl('')
  })

  constructor(
    private prdService: ProductService,
    private catService: CategoryService
  ) { }

  ngOnInit(): void {
    this.catService.getCategories().subscribe((res: any) => {
      this.categories = res.result;
    })

    this.prdService.getProduct(this.urlData).subscribe((res: any) => {
      this.products = res.result;
    });
  }

  filterPrdByCat(cat_id: number) {
    this.urlData.category_id = cat_id;

    this.prdService.getProduct(this.urlData).subscribe((res: any) => {
      this.products = res.result;
    })
  }

  showProductSearch() {
    if (!this.searchForm.value.name) return;
    this.urlData = {};

    this.urlData.search = this.searchForm.value.name;

    this.prdService.getProduct(this.urlData).subscribe((res: any) => {
      this.products = res.result;
    });

    this.searchForm.reset();
  }

  sortProduct(sort: any, order: any, string: string) {
    this.urlData.sort = sort;
    this.urlData.order = order;
    this.sortType = string;

    this.prdService.getProduct(this.urlData).subscribe((res: any) => {
      this.products = res.result;
    })
  }

  reloadShop() {
    this.sortType = 'Sort By';

    this.prdService.getProduct().subscribe((res: any) => {
      this.products = res.result;
    });
  }
}

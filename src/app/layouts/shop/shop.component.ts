import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AccountService } from 'src/app/service/account.service';
import { CategoryService } from 'src/app/service/category.service';
import { FavouriteService } from 'src/app/service/favourite.service';
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
  checkFavourite: any = [];
  urlData: any = {};

  checkLogin: boolean = false;
  account: any = {};

  searchForm: FormGroup = new FormGroup({
    name: new FormControl('')
  })

  constructor(
    private prdService: ProductService,
    private catService: CategoryService,
    private accServive: AccountService,
    private favouriteService: FavouriteService
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

    this.catService.getCategories().subscribe((res: any) => {
      this.categories = res.result;
    })

    this.getProductData();
  }

  filterPrdByCat(cat_id: number) {
    this.urlData.category_id = cat_id;

    this.getProductData(this.urlData);
  }

  showProductSearch() {
    if (!this.searchForm.value.name) return;

    this.urlData = {};
    this.urlData.search = this.searchForm.value.name;

    this.getProductData(this.urlData);

    this.searchForm.reset();
  }

  sortProduct(sort: any, order: any, string: string) {
    this.urlData.sort = sort;
    this.urlData.order = order;
    this.sortType = string;

    this.getProductData(this.urlData);
  }

  reloadShop() {
    this.sortType = 'Sort By';

    this.getProductData();
  }

  addFavourite(prd_id: any) {
    if (!this.checkLogin) {
      alert('You are not logged into your account');
      return;
    } else {
      let data = {
        account_id: this.account.id,
        product_id: prd_id
      }

      this.favouriteService.addFavourite(data).subscribe((res: any) => {
        this.getProductData(this.urlData);
      });
    }
  }

  removeFavourite(prd_id: any) {
    let data = {
      account_id: this.account.id,
      product_id: prd_id
    }

    this.favouriteService.removeFavourite(data).subscribe((res: any) => {
      this.getProductData(this.urlData);
    });
  }
}

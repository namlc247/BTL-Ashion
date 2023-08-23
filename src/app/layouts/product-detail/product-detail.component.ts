import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from 'src/app/service/account.service';
import { CartService } from 'src/app/service/cart.service';
import { NotificationService } from 'src/app/service/notification.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})

export class ProductDetailComponent implements OnInit {
  prd: any = {};
  checkLogin: boolean = false;
  account: any = {};

  constructor(
    private prdService: ProductService,
    private activatedRoute: ActivatedRoute,
    private accServive: AccountService,
    private notificationSrv: NotificationService,
    private cartService: CartService,
  ) { }

  ngOnInit(): void {
    this.account = this.accServive.getAccountInStorage();
    this.checkLogin = this.account ? true : false;

    this.activatedRoute.paramMap.subscribe(params => {
      let id: any = params.get('id');

      this.prdService.getProductById(id).subscribe((res: any) => {
        this.prd = res.result;
      })
    })
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
          this.cartService.updateQuantity(data).subscribe();
        } else {
          let data = {
            account_id: this.account.id,
            product_id: prd_id
          }
          this.cartService.addCart(data).subscribe();
        }

        this.notificationSrv.showSuccess('', 'Added to Cart!');
      });
    }
  }
}

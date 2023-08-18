import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './layouts/home/home.component';
import { ShopComponent } from './layouts/shop/shop.component';
import { CartComponent } from './layouts/cart/cart.component';
import { CheckoutComponent } from './layouts/checkout/checkout.component';
import { ProductDetailComponent } from './layouts/product-detail/product-detail.component';
import { ContactComponent } from './layouts/contact/contact.component';
import { LoginComponent } from './layouts/login/login.component';
import { RegisterComponent } from './layouts/register/register.component';
import { FavouriteComponent } from './layouts/favourite/favourite.component';
import { BlogComponent } from './layouts/blog/blog.component';
import { BlogDetailComponent } from './layouts/blog-detail/blog-detail.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'cart', component: CartComponent },
  { path: 'favourite/:user_name', component: FavouriteComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'product-detail/:id', component: ProductDetailComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'blog-detail', component: BlogDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SearchComponent } from './components/search/search.component';
import { HomeComponent } from './layouts/home/home.component';
import { ShopComponent } from './layouts/shop/shop.component';
import { CartComponent } from './layouts/cart/cart.component';
import { CheckoutComponent } from './layouts/checkout/checkout.component';
import { ProductDetailComponent } from './layouts/product-detail/product-detail.component';
import { ContactComponent } from './layouts/contact/contact.component';
import { LoginComponent } from './layouts/login/login.component';
import { RegisterComponent } from './layouts/register/register.component';
import { FavouriteComponent } from './layouts/favourite/favourite.component';
import { ToastrModule } from 'ngx-toastr';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { BlogComponent } from './layouts/blog/blog.component';
import { BlogDetailComponent } from './layouts/blog-detail/blog-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SearchComponent,
    HomeComponent,
    ShopComponent,
    CartComponent,
    CheckoutComponent,
    ProductDetailComponent,
    ContactComponent,
    LoginComponent,
    RegisterComponent,
    FavouriteComponent,
    BlogComponent,
    BlogDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      maxOpened: 0,
      autoDismiss: true,
      preventDuplicates: true,
    }),
    SweetAlert2Module.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

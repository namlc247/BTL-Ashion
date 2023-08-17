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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      maxOpened: 2
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

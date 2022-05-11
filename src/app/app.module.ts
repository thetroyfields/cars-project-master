import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShoppingComponent } from './shopping/shopping.component';
import { CartComponent } from './shopping/cart/cart.component';
import { CartItemComponent } from './shopping/cart/cart-item/cart-item.component';
import { FiltersComponent } from './shopping/filters/filters.component';
import { CarListComponent } from './shopping/car-list/car-list.component';
import { CarListItemComponent } from './shopping/car-list/car-list-item/car-list-item.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavComponent } from './shared/nav/nav.component';
import { HeaderComponent } from './shared/header/header.component';
import { CarService } from './shopping/car-list/car.service';
import { CarDetailComponent } from './shopping/car-detail/car-detail.component';
import { SellComponent } from './shopping/sell/sell.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthComponent } from './auth/auth.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    ShoppingComponent,
    CartComponent,
    CartItemComponent,
    FiltersComponent,
    CarListComponent,
    CarListItemComponent,
    FooterComponent,
    NavComponent,
    HeaderComponent,
    CarDetailComponent,
    SellComponent,
    AuthComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [CarService, {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }

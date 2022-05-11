import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Car } from '../car-list/car.model';
import { CartItem } from './cart-item/cart-item.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartChanged = new Subject<CartItem[]>();
  cart: CartItem[] = [];

  constructor( private http: HttpClient) { }

  getCart(){
    return this.cart.slice();
  }

  setCart(items: CartItem[]){
    this.cart = items;
    this.cartChanged.next(this.cart);
  }
  
  addToCart(car: Car) {
    let itemToAdd = new CartItem(car, 1 );

    return this.http
    .post<CartItem>('https://cars-56cf1-default-rtdb.firebaseio.com/cart.json', itemToAdd)
    .subscribe((data) => {
      this.cart.push(itemToAdd)
      this.cartChanged.next(this.cart.slice());
      }
    );
  }

  removeFromCart(index: number){
    this.cart.splice(index, 1);
    this.cartChanged.next(this.cart.slice());
  }

  // checkCart(id: number){
  //   for (let item of this.cart){
  //     if ( item.productId === id){
  //       return true;
  //     }
  //   }
  // }
}


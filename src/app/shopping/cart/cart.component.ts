import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartItem } from './cart-item/cart-item.model';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  subscription!: Subscription;
  cart!: CartItem[];
  constructor( private cartService: CartService) { }

  ngOnInit() {
    this.subscription = this.cartService.cartChanged.subscribe((cartItems: CartItem[]) => {
      this.cart = cartItems;
    })
    this.cart = this.cartService.getCart();
  }

}

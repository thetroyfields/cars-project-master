import { Component, Input, OnInit } from '@angular/core';
import { Car } from '../../car-list/car.model';
import { CartService } from '../cart.service';
import { CartItem } from './cart-item.model';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {

  @Input() cartItem!: CartItem;
  @Input() index!: number;
  
  constructor(private cartService: CartService) { }

  ngOnInit() {
    
  }
  
  onRemoveFromCart(index: number) {
    this.cartService.removeFromCart(index)
  }
}

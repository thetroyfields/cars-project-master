import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CartService } from '../../cart/cart.service';
import { Car } from '../car.model';
import { CarService } from '../car.service';

@Component({
  selector: 'app-car-list-item',
  templateUrl: './car-list-item.component.html',
  styleUrls: ['./car-list-item.component.css'],
})
export class CarListItemComponent implements OnInit {
  @Input() car!: Car;
  @Input() inCart?: boolean;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit() {
    // this.cartService.checkCart(this.index)
  }

  onViewItem() {
    this.router.navigateByUrl(`${this.car.id}`);
  }
  onAddToCart() {
    this.cartService.addToCart(this.car);
  }
  onRemoveFromCart() {
    this.cartService.removeFromCart(this.car)
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { CartItem } from '../cart/cart-item/cart-item.model';
import { CartService } from '../cart/cart.service';
import { Car } from './car.model';
import { CarService } from './car.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css'],
})
export class CarListComponent implements OnInit, OnDestroy {
  carSubscription!: Subscription;
  cartSubscription!: Subscription;
  cars!: Car[];
  cart!: CartItem[];

  constructor(
    private carService: CarService,
    private dataService: DataStorageService,
    private cartService: CartService
  ) {}

  ngOnDestroy() {
    this.carSubscription.unsubscribe();
  }

  ngOnInit() {
    this.carSubscription = this.carService.carsChanged.subscribe(
      (cars: Car[]) => {
        this.cars = cars;
      }
    );

    this.cartSubscription = this.cartService.cartChanged.subscribe(
      (cart: CartItem[]) => {
        this.cart = cart;
      }
    );

    this.dataService.fetchCars().subscribe((data) => {
      this.carService.carsChanged.next(data);
    });
  }

  // checkCart(id: number) {
  //   if (this.cart.filter((item) => item.car === id)) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }
}

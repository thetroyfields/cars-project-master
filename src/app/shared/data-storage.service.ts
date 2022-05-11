import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, map, take, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { Car } from '../shopping/car-list/car.model';
import { CarService } from '../shopping/car-list/car.service';
import { CartService } from '../shopping/cart/cart.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private carService: CarService,
    private cartService: CartService,
    private authService: AuthService
  ) {}

  fetchCars() {
    return this.http
      .get<any>('https://cars-56cf1-default-rtdb.firebaseio.com/cars.json')
      .pipe(
        map((cars) => {
          let keys = Object.keys(cars);
          return keys.map((id: string) => {
            return {
              id: id,
              ...cars[id],
            };
          });
        }),
        tap((cars) => {
          this.carService.setCars(cars);
        })
      );
  }

  fetchCart() {
    return this.http
      .get<any>('https://cars-56cf1-default-rtdb.firebaseio.com/cart.json')
      .pipe(
        map((cart) => {
          let keys = Object.keys(cart);
          return keys.map((id: string) => {
            return {
              id: id,
              ...cart[id],
            };
          });
        }),
        tap((cart) => {
          this.cartService.setCart(cart);
        })
      );
  }

  newCar(car: Car) {
    this.http
      .post<Car>(
        'https://cars-56cf1-default-rtdb.firebaseio.com/cars.json',
        car
      )
      .subscribe((data) => {
        return this.carService.addNewCar(data);
      });
  }
}

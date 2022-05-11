import { Injectable } from '@angular/core';
import { Car } from './car.model';

import { HttpClient } from '@angular/common/http';
import { map, Subject } from 'rxjs';

@Injectable()
export class CarService {
  carsChanged = new Subject<Car[]>();
  cars: Car[] = [];

  constructor(private http: HttpClient) {}

  addNewCar(car: Car) {
    // return this.http
    //   .post('https://cars-56cf1-default-rtdb.firebaseio.com/cars.json', car)
    //   .subscribe((data) => {
        this.cars.push(car);
        this.carsChanged.next(this.cars.slice());
      // });
  }

  getCar(index: number) {
    return this.cars[index];
  }

  getCars() {
    return this.cars.slice();
  }

  setCars(cars: Car[]) {
    this.cars = cars;
    this.carsChanged.next(this.cars.slice());
  }

  priceFilter(min: number, max: number) {
    let filteredCars: Car[] = [];
    for (let car of this.cars) {
      if (car.price >= min && car.price <= max) {
        filteredCars.push(car);
      }
    }
    this.carsChanged.next(filteredCars);
  }

  cancelFilter() {
    this.carsChanged.next(this.cars);
  }
}

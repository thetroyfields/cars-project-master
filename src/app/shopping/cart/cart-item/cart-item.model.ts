import { Car } from "../../car-list/car.model"

export class CartItem {
    
    car: Car;
    quantity: number;


    // TODO: Populate products from an API
    constructor( car: Car, quantity: number) {
        this.car = car,
        this.quantity = quantity
    }
}
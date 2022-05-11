import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Car } from '../car-list/car.model';
import { CarService } from '../car-list/car.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  id!: number;
  car!: Car;
  constructor( private route: ActivatedRoute,
            private carService: CarService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['index'];
    })
    this.car = this.carService.getCar(this.id);
    console.log(this.car);
  }

}

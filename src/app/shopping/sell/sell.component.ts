import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Car } from '../car-list/car.model';
import { CarService } from '../car-list/car.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css']
})
export class SellComponent implements OnInit {

  newCarForm!: FormGroup;

  constructor( private carService: CarService,
              private router: Router) {}

  ngOnInit() {
    this.initForm();
  }

  onSubmit() {
    this.carService.addNewCar(this.newCarForm.value);
    this.router.navigate(['/shopping']);
    console.log(this.newCarForm)
  }

  private initForm(){
    let name = '';
    let description = '';
    let price = '';
    let imageUrl = '';

    this.newCarForm = new FormGroup({
      name: new FormControl(name, Validators.required),
      description: new FormControl(description, Validators.required),
      price: new FormControl(price, Validators.required),
      imageUrl: new FormControl(imageUrl, Validators.required)
    })

  }

}

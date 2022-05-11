import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { CarService } from '../car-list/car.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
})
export class FiltersComponent implements OnInit {
  constructor(
    private carService: CarService,
    private dataStorageService: DataStorageService
  ) {}

  priceFilterChanged = new Subject<number>();
  priceFilterForm!: FormGroup;
  filterActive = false;

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    let min = null;
    let max = null;

    this.priceFilterForm = new FormGroup({
      min: new FormControl(min),
      max: new FormControl(max),
    });
  }

  onSubmit() {
    this.carService.priceFilter(
      this.priceFilterForm.value.min,
      this.priceFilterForm.value.max
    );
    this.filterActive = true;
  }

  onCancelFilter() {
    this.filterActive = false;
    this.carService.cancelFilter();
  }
}

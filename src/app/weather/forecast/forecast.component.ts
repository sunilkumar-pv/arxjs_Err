import { Component, OnInit } from '@angular/core';
import { ForecastService } from '../forecast.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent implements OnInit {
  forecast$: Observable<{ dateString: string; temp: number; }[]>;
  forecastData = [];
  // constructor(forecastService: ForecastService) {
  //   forecastService.getCurrentLocation()
  //          .subscribe((coords) => {
  //             console.log(coords);
  //          });
  //  }

  // constructor(forecastService: ForecastService) {
  //   forecastService.getForecast().subscribe(forecastData => {
  //      this.forecastData = forecastData; 
  //   });
  //  }

  constructor(forecastService: ForecastService) {
    this.forecast$ = forecastService.getForecast()
  }
  //news api org
//d3f4ddf6042a42eeb5a8e6480e065421
//d3f4ddf6042a42eeb5a8e6480e065421

  ngOnInit(): void {
  }

}

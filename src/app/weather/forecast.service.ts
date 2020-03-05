import { Injectable } from '@angular/core';
import { Observable, observable, of, throwError} from 'rxjs';
import { map, switchMap, pluck, mergeMap , filter, toArray, share, tap, catchError, retry} from 'rxjs/operators';
import  { HttpClientModule, HttpParams, HttpClient } from '@angular/common/http';
import { NotificationsService } from '../notifications/notifications.service';

interface OpenWeatherRespoonse {
  list: {
    dt_txt: string,
      main: {
      temp: number;
      }
  }[]
}

@Injectable({
  providedIn: 'root'
})
export class ForecastService {
 
  private url='https://api.openweathermap.org/data/2.5/forecast';

  constructor(private http:HttpClient, 
        private notificationsService : NotificationsService) { }


  getForecast() {
    return this.getCurrentLocation()
       .pipe (
           map(coords => {
             return new HttpParams()
                    .set('lat', String(coords.latitude))
                    .set('lon', String(coords.longitude))
                    .set('units', 'metric')
                    .set('appid', '202f8a1dcd0035558368da88920babe4')
           }),
           switchMap(params => this.http.get<OpenWeatherRespoonse>(this.url, { params:params})
            ),
            pluck('list'),

            mergeMap(value => of(...value)),
            filter((value, index) => index % 8 === 0),

            map(value => {
             return { dateString: value.dt_txt ,
                      temp: value.main.temp
                     };
                }),
             toArray(),
             share()
       );
  }

  // getCurrentLocation(){
  //   window.navigator.geolocation.getCurrentPosition((position)=>{
  //     (position)=>{
  //       this.position = position;
  //       getForecastData();
  //     }
  //   });
  // }
  
  getCurrentLocation(){
    return new Observable<Coordinates>((observer) => {
      console.log('trying to get location .. ');
         window.navigator.geolocation.getCurrentPosition(
           (position) => {
             observer.next(position.coords);
             observer.complete();
           },
           err =>  observer.error(err)
         );

    }).pipe(
         retry(1),

          tap(() => {
            this.notificationsService.addSuccess('Got your location !');
          }, 
          // (err) => {
          //     this.notificationsService.addError('Falied to get your location');
          // })
          catchError((err) => {
            // #1 Handle the error
            this.notificationsService.addError('Falied to get your location');
            // #2  Return a new Observable
            return throwError(err);

          })

    ));
  }


}

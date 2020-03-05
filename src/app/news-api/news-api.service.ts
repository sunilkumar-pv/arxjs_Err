import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { tap, map, switchMap, pluck } from 'rxjs/operators';
import { HttpParams , HttpClient , HttpHeaders } from '@angular/common/http';
 

export interface Article {
  title:string;
  url:string;
  source: {
    name:string;
  }
}

export interface NewsApiResponse {
    totalResults: number;
    articles:  Article[];
}

@Injectable({
  providedIn: 'root'
})
export class NewsApiService {

 private url ='https://newsapi.org/v2/top-headlines ';
 private pageSize= 10;
 private apiKey ='d3f4ddf6042a42eeb5a8e6480e065421';
 private coutry ='in';

 private pagesInput: Subject<number>;
 pagesOutput: Observable<Article[]>;
 numberOfPages: Subject<number>;


  constructor(private http: HttpClient) { 
    this.numberOfPages = new Subject();

    this.pagesInput = new Subject();
    this.pagesOutput = this.pagesInput.pipe(
      map((page) => {
         return new HttpParams()
                  .set('apiKey', this.apiKey)
                  .set('country', this.coutry)
                  .set('pageSize', String(this.pageSize))
                  .set('page', String(page));
           }),
           switchMap((params) => {
             return this.http.get<NewsApiResponse>(this.url, { params: params } );
           }),
           tap(response => {
             const totalPages = Math.ceil(response.totalResults / this.pageSize);
             this.numberOfPages.next(totalPages);
           }),
           pluck('articles')
         );
       }

       getPage(page: number){
        this.pagesInput.next(page);
       }
  }



 
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, of,forkJoin } from 'rxjs'
import { environment } from 'src/app/shared/parameters';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }



  url = environment.url_api;
  token = localStorage.getItem('token') ?? '';
  header ={
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Origin': '*',
     Authorization : `Bearer ${this.token}`
  }


  getProxCobros(){
    const url = `${this.url}/sale/get-cobros`;
    return this.http.get(url, {headers: this.header}).pipe(
      map((data:any) => data),
      catchError((err: HttpErrorResponse) => {
        if(err.status === 400){
          console.log("entre p",err.error.message)
          return of(err)
        }

        return of(err)
      })
    );

  }
}

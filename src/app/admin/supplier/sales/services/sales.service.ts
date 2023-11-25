import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, of } from 'rxjs'
import { environment } from 'src/app/shared/parameters';

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  constructor(private http: HttpClient) { }


  url = environment.url_api;
  token = localStorage.getItem('token') ?? '';
  header ={
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Origin': '*',
     Authorization : `Bearer ${this.token}`
  }


  getSalesCompleteAccount(){
    const url = `${this.url}/sale/get-sale-CompleteAccount`;
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
  getSaleCompletAccountProfile(){
    const url = `${this.url}/sale/get-sale-CompleteAccountProfile`;
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

  getInfoVentaCuentaPerfil(){
    const url = `${this.url}/sale/get-info-sale-disponible-profile`;
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
  getInfoVentaCuenta(){
    const url = `${this.url}/sale/get-info-sale-disponible`;
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

  getInfoVentaPerfilID(id:any){
    const url = `${this.url}/sale/get-info-sale/${id}`;
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
  updateSale(data:any){
    const url = `${this.url}/sale/update-sale`;
    return this.http.post(url,data, {headers: this.header}).pipe(
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


  deleteSale(data:any){
    const url = `${this.url}/sale/delete-sale`;
    return this.http.post(url,data, {headers: this.header}).pipe(
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
  renewSale(data:any){
    const url = `${this.url}/sale/renew-sale`;
    return this.http.post(url,data, {headers: this.header}).pipe(
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

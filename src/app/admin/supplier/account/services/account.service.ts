import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, of } from 'rxjs'
import { environment } from 'src/app/shared/parameters';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }
  url = environment.url_api;
  token = localStorage.getItem('token') ?? '';
  header ={
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Origin': '*',
     Authorization : `Bearer ${this.token}`
  }

  getPlatforms() {
    const url = `${this.url}/platforms`;
    return this.http.get(url, {headers: this.header}).pipe(
      map((data:any) => data),
      catchError((err: HttpErrorResponse) => {
        console.log("entre p",err)
        if(err.status === 400 || err.status === 0 || err.status === 500){
          console.log("entre p",err.error.message)
          return of(err)
        }

        return of(err)
      })
    );

  }
  infoPlatFormsID(data: any){
    const url = `${this.url}/platforms/info-platforms`;
    // this.header.Authorization = 'Bearer ' + localStorage.getItem('token');
    return this.http.post(url,data, {headers: this.header}).pipe(
      map((data)=>data));

  }

  infoClientPlatforms(data: any){
    const url = `${this.url}/platforms/info-client-platforms`;
    // this.header.Authorization = 'Bearer ' + localStorage.getItem('token');
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

  createPlatform(data: any){
    const url = `${this.url}/platforms/create-platform`;

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


  getClients(){
    const url = `${this.url}/client/get-clients`;
    return this.http.get(url, {headers: this.header}).pipe(
      map((data)=>data));
  }

  createSale(data: any){

    const url = `${this.url}/sale/create-sale`;
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


  updatePlatform(data: any){
    const url = `${this.url}/platforms/update-platform`;
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

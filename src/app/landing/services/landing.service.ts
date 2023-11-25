import { Injectable } from '@angular/core';
import { environment } from 'src/app/shared/parameters';
import { catchError, map, of,forkJoin } from 'rxjs'
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

export interface ICustomer {
  cliente: string
  estado: string
  diasVencidos: string
  id_supplier_service: number
  correo: string
  nombre: string
  cobro: string
  fecha_cobro: string

}
@Injectable({
  providedIn: 'root'
})
export class LandingService {

  constructor(private http:HttpClient) { }
  url = environment.url_api;
  token = localStorage.getItem('token') ?? '';
  header ={
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Origin': '*',
     Authorization : `Bearer ${this.token}`
  }



  getServiceClient(phone:string){
    const url = `${this.url}/client/get-client-supplier-by-phone`;
    return this.http.post<ICustomer[]>(url, {phone}, {headers: this.header}).pipe(
      map((data)=>data)
    )
  }
}

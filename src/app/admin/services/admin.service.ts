import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/app/shared/parameters';
import { LocalStorageStoreService } from 'src/app/shared/services/local-storage.service';

interface IInfoSupplier {
  id_supplier?: number;
  name?: string;
  lastname?: string;
  mail?: string;
  description?: string;
  phone?: string;
  department?: string;
  image?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  infoSupplier: IInfoSupplier = {}
  supplierEmitter: EventEmitter<IInfoSupplier> = new EventEmitter<IInfoSupplier>();

  constructor(private http: HttpClient, private localStorage: LocalStorageStoreService ) { }

    url = environment.url_api;
    headers = {
      'Content-Type': 'application/json',
       'Access-Control-Allow-Origin': '*',
       'Access-Control-Allow-Credentials': 'true',
       Authorization : 'Bearer'
    }
    getInfoSupplier(){
      this.headers.Authorization = 'Bearer ' + this.localStorage.getItem('token');
      // this.headers.Authorization = 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtYWlsIjoiamVzdXNyb2phc0BnbWFpbC5jb20iLCJpYXQiOjE2OTM0MzgwODksImV4cCI6MTY5MzUyNDQ4OX0.AIA4QtAvDxew8SlLKJ9N3TQOgcgwPE5Fh6FA7fUBYD8'
      return this.http.get(this.url + '/auth/info-supplier', {headers: this.headers}).pipe(
        map((data: any) => {

          if(data.department === null) data.department = ''
          if(data.phone === null) data.phone = ''
          if(data.description === null) data.description = ''
          if(data.image === null) data.image = ''

          this.infoSupplier = {
            id_supplier: data.id_supplier,
            name: data.name,
            lastname: data.lastname,
            mail: data.mail,
            description: data.description,
            phone: data.phone,
            department: data.department,
            image: data.image
          }

          this.supplierEmitter.emit(this.infoSupplier);

          return data
        }));

    }

    updateFieldsProfile(information:Partial<IInfoSupplier>){
      this.infoSupplier = {
        ...this.infoSupplier,
        ...information
      }
      this.supplierEmitter.emit(this.infoSupplier);
    }
}

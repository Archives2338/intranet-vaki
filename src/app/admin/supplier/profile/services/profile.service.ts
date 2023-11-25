import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/shared/parameters';
import { map } from 'rxjs'

interface IUpdateProfile {
    id_supplier: number
    name: string
    description: string
    phone: string
    mail: string
    department: string
}

interface IResponseUploadImage{
    url:string
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

 
    url = environment.url_api;
    token = localStorage.getItem('token') ?? '';
    header ={
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Origin': '*',
       Authorization : `Bearer ${this.token}`
    }

  constructor(private http: HttpClient) { }

  updateFieldProfile(information:IUpdateProfile){
    const {name,department,description,phone,mail, id_supplier} = information
    const url = `${this.url}/auth/update-supplier`;
    return this.http.post<boolean>(url, {
        id_supplier,
        name,
        department,
        description,
        phone,
        mail
    }, {headers: this.header}).pipe(
        map((update)=>{
            return update
        })
    )
  }

  

  updateImage(file:File){
 
    const url = `${this.url}/auth/update-image`

    const formData = new FormData()
    formData.append('file', file)

    return this.http.post<IResponseUploadImage>(url,formData
    , {headers: this.header}).pipe(
        map((response)=>{
          const {url} = response
          return url
        })
    )
  }
}

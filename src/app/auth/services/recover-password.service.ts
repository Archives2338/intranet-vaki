import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs'
import { environment } from 'src/app/shared/parameters';

export interface IUpdateResponse{
  status:number
  message:string
}

@Injectable({
  providedIn: 'root'
})
export class RecoverPasswordService {

  urlApi = environment.url_api;

  constructor(
    private http: HttpClient
  ) { }

  updatePassword(data: { tokenChangePass: string; newpassword: string; }) {
    return this.http.post<IUpdateResponse>(`${this.urlApi}/auth/update-password`, data)
      .pipe(
        map((data: IUpdateResponse) => data )
      )
  }

  
}

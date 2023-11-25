import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map,catchError,of } from 'rxjs'
import { environment } from 'src/app/shared/parameters';

export interface ILoginResponse{
    mail:string
    token?:string
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  urlApi = environment.url_api;

  constructor(
    private http: HttpClient
  ) { }

  login(mail:string, password:string) {
    return this.http.post<ILoginResponse>(`${this.urlApi}/auth/login`, {mail, password})
      .pipe(
        map((data: ILoginResponse) => data ),
        catchError((err: HttpErrorResponse) => {
            console.log(err)
            return of({mail} as ILoginResponse)
          }
        ) 
      )
  }
}

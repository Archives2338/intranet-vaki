import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs'
import { environment } from 'src/app/shared/parameters';

export interface IRecoveryResponse{
    status:number
    message:string
}

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  urlApi = environment.url_api;

  constructor(
    private http: HttpClient
  ) { }

  recoveryPassword(mail:string) {
    return this.http.post<IRecoveryResponse>(`${this.urlApi}/auth/recover-password`, {mail})
      .pipe(
        map((data: IRecoveryResponse) => data )
      )
  }
}

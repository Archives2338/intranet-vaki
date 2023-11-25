import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { Observable, catchError, map, of } from 'rxjs';
import { ILoginResponse } from 'src/app/auth/services/login.service';
import { environment } from 'src/app/shared/parameters';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private oAuthService: OAuthService, private http: HttpClient) {
    this.initLogin();
  }
  url = environment.url_api;



  initLogin() {
    const config : AuthConfig = {
      issuer: 'https://accounts.google.com',
      strictDiscoveryDocumentValidation: false,
      clientId: '340965864929-am5b12psfn82lv7ji9jh2ciddtk0v9dv.apps.googleusercontent.com',

      redirectUri: window.location.origin+'/e-commerce/',

      scope: 'openid profile email',

    };
    this.oAuthService.configure(config);
    this.oAuthService.setupAutomaticSilentRefresh();
    this.oAuthService.loadDiscoveryDocumentAndTryLogin();
  }

  login() {
    console.log("entre aca")
    this.oAuthService.initLoginFlow();
  }
  logout() {
    this.oAuthService.logOut();

  }
  getProfile() {
    return this.oAuthService.getIdentityClaims();
  }

  authUser(): Observable<any>{
    const url = `${this.url}/auth/login-ecommerce`;

    const tokenGoogle = sessionStorage.getItem('id_token');
    return this.http.post(url, {token: tokenGoogle})
    .pipe(
      map((data: any) => data ),
      catchError((err: HttpErrorResponse) => {
          console.log(err)
          return of({tokenGoogle} )
        }
      )
    )

  }
}

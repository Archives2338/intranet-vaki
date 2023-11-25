import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../shared/parameters';

interface TokenResponse {
    valid: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class VerifyTokenService {

    urlApi = environment.url_api;

    constructor(
        private http: HttpClient
    ) { }

    isTokenValid(token: string) {
        return this.http.post<TokenResponse>(`${this.urlApi}/auth/verify-token`, { token });
    }
}

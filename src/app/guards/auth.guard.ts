import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { VerifyTokenService } from '../service/verify-token.service';
import { LocalStorageStoreService } from '../shared/services/local-storage.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(
    private authService: VerifyTokenService, 
    private localStorage: LocalStorageStoreService,
    private router: Router
  ) {}

  canActivate(_next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {


    const  token = this.localStorage.getItem('token')
    if(!token) return this.redirectToLogin();
    return this.authService.isTokenValid(token).subscribe(({valid}) => {
      if(!valid) return this.redirectToLogin();
      if(state.url === '/auth') this.router.navigate(['/admin']);
      return valid
    });

  }

  redirectToLogin() {
    this.router.navigate(['/auth']);
    return false;
  }
}

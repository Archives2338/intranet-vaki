import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { LocalStorageStoreService } from '../shared/services/local-storage.service';
import { VerifyTokenService } from '../service/verify-token.service';


@Injectable({
  providedIn: 'root'
})
export class LoginGuard {

    constructor(
        private authService: VerifyTokenService, 
        private localStorage: LocalStorageStoreService,
        private router: Router
      ) {}

    canActivate() {
        const  token = this.localStorage.getItem('token')
        if(!token) return true
        return this.authService.isTokenValid(token).subscribe(({valid}) => {
            if(valid) this.router.navigate(['/admin']);
            return valid
        });

    }

   
}

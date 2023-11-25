import { Component, Input } from '@angular/core';
import { LoginService } from '../../pages/auth/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
// input setvalue
constructor(private services:LoginService, private router:Router) { }

img = ''
@Input () set value (value:any){
  if (value !==''){
    this.img = value;
  }
}
logout(){
  this.services.logout();

}
login(){
  this.router.navigate(['/e-commerce/auth']);
}
}

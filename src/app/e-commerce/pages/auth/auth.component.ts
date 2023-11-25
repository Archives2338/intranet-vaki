import { Component } from '@angular/core';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {


  constructor(private authGoogleService:LoginService) { }

  ngOnInit(): void {
  }

  login() {
    console.log("entre al login")
    this.authGoogleService.login();
  }

}

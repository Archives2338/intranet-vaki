import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecoverPasswordService } from '../services/recover-password.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss']
})
export class RecoverPasswordComponent {

 public formCreate: FormGroup = new FormGroup({});
  tokenToUpdatePassword?: string;

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private recoverService: RecoverPasswordService,
      private fb:FormBuilder
    ) {}

  
  ngOnInit(): void {
    const changepasswordtoken = this.route.snapshot.queryParams['changepasswordtoken'];
    this.tokenToUpdatePassword = changepasswordtoken;
    this.formCreate = this.fb.group({
      newpassword: ['',[Validators.required,Validators.minLength(8),Validators.pattern(/^(?=.*[A-Z])/)]],
      newpasswordrepeat: ['',[Validators.required,Validators.minLength(8),Validators.pattern(/^(?=.*[A-Z])/)]]
    })
  }
  

  updatePassword() {

    if(!this.tokenToUpdatePassword) return alert('Token not found')
    if(!this.formCreate.valid) return alert('Verifique los campos');
    const { newpassword, newpasswordrepeat } = this.formCreate.value
    if(newpassword !== newpasswordrepeat) return alert('Passwords do not match')

    const  data = {
      tokenChangePass: this.tokenToUpdatePassword,
      newpassword
    }
    this.recoverService.updatePassword(data).subscribe(data=>{
      const {status,message} = data
      if(status===200){
        this.formCreate.reset()
        this.router.navigate(['/auth']);
      }
      alert(message)
    })

  }

}

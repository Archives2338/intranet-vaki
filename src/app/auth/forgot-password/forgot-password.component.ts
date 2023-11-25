import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ForgotPasswordService } from '../services/forgot-password.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  public formCreate: FormGroup = new FormGroup({});
  validing : boolean = false;
  constructor(
    private fb:FormBuilder,
    private forgotPasswordService: ForgotPasswordService
  ){}

  ngOnInit(): void {
    this.formCreate = this.fb.group({
      mail_account: ['',[Validators.required,Validators.email]]
    })
  }

  sendMail(){
    if(!this.formCreate.valid) return alert('Verifique los campos');
    this.validing = true;
    const { mail_account } = this.formCreate.value;
    this.forgotPasswordService.recoveryPassword(mail_account).subscribe(data=>{
      const {status,message} = data
      if(status===200){
        this.formCreate.reset()
      }
      alert(message)
      this.validing = false;
    })

  }
}

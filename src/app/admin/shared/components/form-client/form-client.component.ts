import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AccountService } from 'src/app/admin/supplier/account/services/account.service';
// import { AccountService } from '../../../../services/account.service';
@Component({
  selector: 'app-form-client',
  templateUrl: './form-client.component.html',
  styleUrls: ['./form-client.component.scss']
})
export class FormClientComponent {
  public platForms : any = [];
  public formCreate: FormGroup = new FormGroup({});
  constructor(
   private fb:FormBuilder,public AccountService: AccountService, public dialog:MatDialog)

    { }

  ngOnInit(): void {
    this.formCreate = this.fb.group({
      name: ['',[Validators.required]],
      phone: ['',[Validators.required,Validators.minLength(8)]],
      date_expiration: ['',[Validators.required]],
      mail: ['',[Validators.required,Validators.email]],
    })
    this.getPlatforms();
  }


  getPlatforms(){
    // this.loading = true;

  }

  savePlatformService(){

    const formValid = this.validateForm();


  }

  validateForm():boolean{


    if(this.formCreate.valid){

      return true;
    }
    else{
      console.log("formu",this.formCreate)
      return false;
    }
  }
}

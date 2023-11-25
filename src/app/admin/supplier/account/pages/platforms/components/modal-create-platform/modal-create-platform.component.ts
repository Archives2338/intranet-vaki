import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AccountService } from '../../../../services/account.service';
import { ModalConfirmComponent } from 'src/app/admin/shared/components/modal-confirm/modal-confirm.component';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-modal-create-platform',
  templateUrl: './modal-create-platform.component.html',
  styleUrls: ['./modal-create-platform.component.scss']
})
export class ModalCreatePlatformComponent implements OnInit {
  public platForms : any = [];
  public formCreate: FormGroup = new FormGroup({});
  public now = new Date();
  constructor(    private snackBar: MatSnackBar,private dialogref:MatDialogRef<ModalCreatePlatformComponent>,
    @Inject(MAT_DIALOG_DATA) public dataPlatform:any,private fb:FormBuilder,public AccountService: AccountService, public dialog:MatDialog)

    { }

  ngOnInit(): void {
    this.formCreate = this.fb.group({
      mail_account: ['',[Validators.required,Validators.email]],
      password: ['',[Validators.required,Validators.minLength(8)]],
      date_expiration: [this.now,[]],
      type_account: [false,[]],
      number_profiles: [1,[]],
      state : [0],
      id_platform: ['',[Validators.required]],
    })
    this.getPlatforms();
  }


  getPlatforms(){
    // this.loading = true;
    this.AccountService.getPlatforms().subscribe((data:any)=>{
      console.log(data);
      // this.loading = false;
      this.platForms = data
      if(this.dataPlatform && this.dataPlatform != 0){
        this.formCreate.get('id_platform')?.setValue(this.dataPlatform)
      }
    });
  }

  savePlatformService(){

    const formValid = this.validateForm();
    if(formValid){
      this.dialog.open(ModalConfirmComponent,{
        data:'¿Estas seguro de crear esta plataforma?',
        width:'450px',
        height:'350px',
        panelClass:'dialog-clientPlatform'
        }).afterClosed().subscribe((confirm:boolean)=>{
          if(confirm){
            const body = this.formCreate.value;
            body.date_expiration =  body.date_expiration.toLocaleDateString('fr-CA')
            body.type_account =  body.type_account ? 0 :1

            this.AccountService.createPlatform(body).subscribe((data:any)=>{
              console.log("data",data);
              if(data.status == 400){
                this.showSnackBar("datos incorrectos","Importante")

                // return false;
              }else{
                this.showSnackBar("Plataforma creada con exito","Cerrar")
                // alert('Plataforma creada con exito')
                this.dialogref.close({
                  confirm:true,
                  id_platform:  this.formCreate.get('id_platform')?.value,
                });

              }



            });

          }
        }
      )

    }else{
      // alert('Verifique los campos')
      this.showSnackBar('Verifique los campos','Cerrar')
    }



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
  showSnackBar(message: string, action: string) {

    this.snackBar.open(message, action , {
      duration: 3000,

    });
  }
}

import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AccountService } from '../../../../services/account.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-modal-edit-platform',
  templateUrl: './modal-edit-platform.component.html',
  styleUrls: ['./modal-edit-platform.component.scss']
})
export class ModalEditPlatformComponent {
  public platForms : any = [];
  public formEdit: FormGroup = new FormGroup({});

  constructor( private snackBar: MatSnackBar,private dialogref:MatDialogRef<ModalEditPlatformComponent>,
    @Inject(MAT_DIALOG_DATA) public dataPlatform:any,
    private fb:FormBuilder,
    private services:AccountService
    ) { }


    ngOnInit()
    {
      console.log(this.dataPlatform)
      this.formEdit = this.fb.group({
        id_service: [this.dataPlatform.id_service,[Validators.required]],
        id_platform: [this.dataPlatform.id_platform,[Validators.required]],
        mail_account: [this.dataPlatform.mail_account,[Validators.required,Validators.email]],
        number_profiles: [this.dataPlatform.number_profiles,[Validators.required]],
        state : 0,
        password: [this.dataPlatform.password,[Validators.required,Validators.minLength(8)]],
        type_account: [this.dataPlatform.type_account == 'perfiles'?true:false,[Validators.required]],
        date_expiration: [this.dataPlatform.date_expiration,[Validators.required]],

      })

      this.getPlatforms();


    }
  public closeModal = () => {

  }

  public editPlatform(){
    if(this.validateForm()){
      this.formEdit.get('type_account')?.setValue(this.formEdit.get('type_account')?.value?0:1)
      this.services.updatePlatform(this.formEdit.value).subscribe((data:any)=>{
        console.log(data)
        this.dialogref.close(true)
        // alert("Plataforma Actualizada")
        this.showSnackBar("Plataforma Actualizada","Aceptar")
      })


    }else{
      // alert("Formulario invalido")
      this.showSnackBar("Formulario invalido","Aceptar")
    }

  }



  showSnackBar(message: string, action: string) {

    this.snackBar.open(message, action , {
      duration: 3000,

    });
  }

  validateForm():boolean{


    if(this.formEdit.valid){

      return true;
    }
    else{
      console.log("formu",this.formEdit)
      return false;
    }
  }
  getPlatforms(){
    // this.loading = true;
    this.services.getPlatforms().subscribe((data:any)=>{
      console.log(data);
      // this.loading = false;
      this.platForms = data
      if(this.dataPlatform && this.dataPlatform != 0){
        this.formEdit.get('id_platform')?.setValue(this.dataPlatform.id_platform)
      }
    });
  }
}

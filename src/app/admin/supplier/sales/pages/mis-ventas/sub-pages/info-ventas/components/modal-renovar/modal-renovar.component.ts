import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/admin/supplier/account/services/account.service';
import { SalesService } from 'src/app/admin/supplier/sales/services/sales.service';
@Component({
  selector: 'app-modal-renovar',
  templateUrl: './modal-renovar.component.html',
  styleUrls: ['./modal-renovar.component.scss']
})
export class ModalRenovarComponent {
  public formCreate: FormGroup = new FormGroup({});
  public filteredClients!: Observable<any[]> | undefined;
  public correo : string = ''
  constructor(
    private fb: FormBuilder,
    public AccountService: AccountService,
    private SaleService: SalesService,
    public dialog: MatDialog,
    public router:Router,
    private snackBar: MatSnackBar,

    public dialogRef: MatDialogRef<ModalRenovarComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any

  ){
    this.formCreate = this.fb.group({
      name: ['', [Validators.required, ]],
      date: ['', [Validators.required]],
      costo: ['', [Validators.required]],
      pin: ['', [Validators.required]],
      id_supplier_service:['', [Validators.required]],

    });

    console.log("data",data)
    if(data){
      this.formCreate.get('name')?.setValue(data.cliente)
      this.formCreate.get('costo')?.setValue(data.cobro)
      this.formCreate.get('id_supplier_service')?.setValue(data.id_supplier_service)
      this.correo = data.correo
    }


  }




  public save(): void {
    if (this.formCreate.valid) {
      let request = {
        id_supplier_service: this.formCreate.get('id_supplier_service')?.value,
        end_date: this.formCreate.get('date')?.value.toLocaleDateString('fr-CA'),
        pin_profile: this.formCreate.get('pin')?.value,
        price_selling:  parseFloat(this.formCreate.get('costo')?.value),
        id_client: 0,
      }


      this.SaleService.renewSale(request).subscribe((res:any)=>{
        console.log("res",res)
        if(res.status == 200){
          this.dialogRef.close();
          this.snackBar.open('Renovación exitosa', 'Cerrar', {
            duration: 2000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
          this.router.navigate(['/admin/supplier/sales'])
        }
      })
    }else{
      console.log("no valido", this.formCreate)
    }
  }





}

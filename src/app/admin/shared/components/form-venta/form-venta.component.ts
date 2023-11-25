import { Component, EventEmitter, Inject, Input, OnInit,Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, map, startWith } from 'rxjs';
import { AccountService } from 'src/app/admin/supplier/account/services/account.service';
import { ModalConfirmComponent } from '../modal-confirm/modal-confirm.component';
import { Venta } from '../../interfaces/venta';
import { Router } from '@angular/router';
@Component({
  selector: 'app-form-venta',
  templateUrl: './form-venta.component.html',
  styleUrls: ['./form-venta.component.scss'],
})
export class FormVentaComponent {
// creamos un output para decirle al padre que cancelo
@Output() event = new EventEmitter<any>();


  public platForms: any = [];
  public formCreate: FormGroup = new FormGroup({});
  public filteredClients!: Observable<any[]> | undefined;
  public dataClients: any = [];
  public requestVenta! : Venta
  public infoService : any
  public correo : string = ''

  @Input () set infoServiceData(value:any){
    console.log("viene primero",value)
    if(value){
      this.infoService = value
      this.correo = value.email
      console.log("infoService",this.infoService)
    }

  }

  constructor(
    private fb: FormBuilder,
    public AccountService: AccountService,
    public dialog: MatDialog,
    public router:Router,
    private snackBar: MatSnackBar
  ) {
    console.log("viene primero2")
  }

  ngOnInit(): void {
    this.formCreate = this.fb.group({
      name: ['', [Validators.required, ]],
      date: ['', [Validators.required]],
      costo: ['', [Validators.required]],
      pin: ['', [Validators.required]],
    });
    console.log("viene primero3")
    this.getPlatforms();
    this.getClients();
    if(this.infoService.type == 'edit'){
      console.log("entre primero")
      // this.formCreate.get('date')?.setValue(new Date(this.infoService.data.date))
      this.formCreate.get('costo')?.setValue(this.infoService.data.price_selling)
      this.formCreate.get('pin')?.setValue(this.infoService.data.pin_profile)
      this.formCreate.get('date')?.setValue(new Date(this.infoService.data.end_date))
    }
    try {
      this.filteredClients = this.formCreate.get('name')?.valueChanges.pipe(
        startWith(''),
        map((state) =>
          state && state.length > 2
            ? this._filterClient(state)
            : this.dataClients.slice()
        )
      );
    } catch (error) {
      console.log('error', error);
    }
  }

  getPlatforms() {
    // this.loading = true;
  }
  getClients() {
    this.AccountService.getClients().subscribe((data: any) => {
      console.log(data);
      // this.loading = false;
      this.dataClients = data;
      if(this.infoService.type == 'edit'){
        // console.log("infoService",this.infoService)
        const id_client = this.infoService.data.id_client

        // buscamos en el arreglo de clientes el id_client
        const client = this.dataClients.find((client:any)=>client.id_client == id_client)
        this.formCreate.get('name')?.setValue(client)
        console.log("cliente",client)
    }
    });
  }
  getDescripcion(option: any) {
    console.log('option', option);
    // lo ponemos en mayuscula
    if (option.name) {
      return option.name;
    }
  }

  public _filterClient(value: string): any[] {
    try {
      console.log('valor', value);
      const filterValue = value.toLowerCase();

      console.log('filterValue', filterValue);
      return this.dataClients.filter(
        (state: any) =>
          state.name.toLowerCase().includes(filterValue) ||
          state.phone.includes(filterValue)
      );
    } catch (error) {
      console.log('first error', error);
      return [];
    }
  }
  savePlatformService() {
    const formValid = this.validateForm();
    if(formValid){
      this.openModalConfirmation()
    }
  }

  validateForm(): boolean {
    if (this.formCreate.valid) {
      return true;
    } else {
      // console.log('formu', this.formCreate);
      return false;
    }
  }

  openModalConfirmation() {
    this.dialog.open(ModalConfirmComponent, {
      data: '¿Estas seguro de crear esta plataforma?',
      width: '450px',
      height: '350px',
      panelClass: 'dialog-clientPlatform',
    }).afterClosed().subscribe((confirm:boolean)=>{
      console.log("confirm",confirm)
      if(confirm){
        this.requestVenta = {
          id_client: this.formCreate.value.name.id_client,
          id_service: this.infoService.id_service,
          end_date: this.formCreate.value.date.toLocaleDateString('fr-CA'),
          price_sellings: this.formCreate.value.costo,
          pin_profile: this.formCreate.value.pin,

        }
        console.log("requestVenta",this.requestVenta)
        this.AccountService.createSale(this.requestVenta).subscribe((data:any)=>{
          console.log("dataNoviembre",data)
          if(data.status == 400){
            this.showSnackBar(data.error.message,'Cerrar')


            // return false;
          }else{
            // alert('Plataforma creada con exito')
            this.showSnackBar('Venta Exitosa','Cerrar')

            // si estoy en la pagina de mis ventas  voy a info ventas
            if(this.router.url == '/admin/sales/mis-ventas/crear-venta'){
              this.router.navigate(['/admin/sales/mis-ventas/info-ventas'])
            }
            let requesetNew:any = this.requestVenta
            requesetNew.name  = this.formCreate.value.name.name
            // vamos agregar el status true o false dependiendo de la fecha
            if(this.formCreate.value.date < new Date()){

              requesetNew.status = false
            }else {
              requesetNew.status = true
            }
            requesetNew.id_supplier_service = data.id_supplier_service
            this.event.emit(this.requestVenta)

            // this.dialogref.close(true);


          }

        });

      }




    });
  }

  cancelVenta(){
    this.event.emit(true)
  }

  showSnackBar(message: string, action: string) {

    this.snackBar.open(message, action , {
      duration: 3000,

    });
  }
}

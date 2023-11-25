import { Component, OnInit } from '@angular/core';
import { SalesService } from '../../../../services/sales.service';
import { AccountService } from 'src/app/admin/supplier/account/services/account.service';
import { ModalInfoClientplatformComponent } from 'src/app/admin/supplier/account/pages/platforms/components/modal-info-clientplatform/modal-info-clientplatform.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-crear-venta',
  templateUrl: './crear-venta.component.html',
  styleUrls: ['./crear-venta.component.scss']
})
export class CrearVentaComponent implements OnInit{

  public typeAccount : Array<any> = [{
    id: 1,
    name: 'Cuenta Completa'
  },
{
  id: 2,
  name: 'Cuenta Por Perfiles'
}]
public group: number = 10;
public search: string = '';
public page!: number;
public size: number = 0;
public filterTable: string = '';
public sortServiceData : Array<any> = [];
public columsTable2 : string[] = ['ID', 'Plataforma', 'Correo','Cant.Usada','Num. Perfiles','Accion'];
public columsTable : string[] = ['ID', 'Plataforma', 'Correo','Cant.Usada','Num. Perfiles','Accion'];
public infoServiceData : any;
public tooltip:string = 'Fecha de Vencimiento de la Cuenta ';
public loading: boolean = false;
public isAsc: boolean = true;
public cuentaSelected : number = 0;
public cuentaSelectedSearched : boolean = false;
public comboSelected : number = 0;
public typeTableSelected : number = 0;
  constructor(private services:SalesService, private accountServices:AccountService,public dialog: MatDialog
    ) { }
  ngOnInit(): void {
    // this.getInfoVentaDisponible()
    this.getInfoVentaDisponiblePerfil()
  }

  public getInfoVentaDisponiblePerfil(){
    this.loading = true;
    this.services.getInfoVentaCuentaPerfil().subscribe((data:any)=>{
      console.log("data",data)
      this.sortServiceData = data;
      this.loading = false;
    })
  }
  public getInfoVentaDisponible(){
    this.loading = true;
    this.services.getInfoVentaCuenta().subscribe((data:any)=>{
      console.log("data",data)
      this.sortServiceData = data;
      this.loading = false;
    })

  }

  public handleSort = (nameColumn :string) => {
    const tableSort = [...this.sortServiceData].sort((a, b) => {
      a =
        typeof a[nameColumn] === "string"
          ? a[nameColumn].toLowerCase()
          : a[nameColumn];
      b =
        typeof b[nameColumn] === "string"
          ? b[nameColumn].toLowerCase()
          : b[nameColumn];
      return this.orderSort(a, b);
    });

    this.sortServiceData = tableSort;

    this.isAsc = !this.isAsc;


  };

  public InfoClientPlatformService(dataServices: any){
    this.loading = true;
    this.cuentaSelected = dataServices.id_service;
    this.cuentaSelectedSearched = true;
    this.accountServices.infoClientPlatforms({id_service: dataServices.id_service}).subscribe((data: any)=>{
      this.loading = false;
      this.openModalInfoClientPlatform({
        profiles: dataServices.number_profiles,
        info: data,
        id_service : dataServices.id_service,
        email : dataServices.mail_account
      });
    })
  }
  public openModalInfoClientPlatform(data: any){

    this.dialog.open(ModalInfoClientplatformComponent, {
      width: '950px',
      height: '650px',
      panelClass: 'dialog-clientPlatform',
      data: {
        profiles: data.profiles,
        info: data.info,
        id_service : data.id_service,
        email: data.email
      }
    });



  }
  public orderSort = (a: any, b: any) => {
    if (this.isAsc) {
      return a > b ? 1 : -1;
    } else {
      return a < b ? 1 : -1;
    }
  }
  public openInvoice(id:any){
    console.log("id",id)
    this.cuentaSelected = id.id_service;
    this.cuentaSelectedSearched = true;
    this.infoServiceData = {
      type: 'add' ,
      email : id.mail_account,
      id_service: id.id_service
    }
  }
  public typeTable(){
    console.log("console", this.comboSelected)
    this.cuentaSelectedSearched = false;
    if(this.comboSelected == 1){
      this.typeTableSelected = 1;
      this.columsTable = ['ID', 'Plataforma', 'Correo','Accion'];
      this.getInfoVentaDisponible()
    }else{
      if(this.comboSelected == 2){
        this.typeTableSelected =2;
        this.columsTable = ['ID', 'Plataforma', 'Correo','Cant.Usada','Num. Perfiles','Accion'];

        this.getInfoVentaDisponiblePerfil()
      }

    }
    }

    public methodCancel(event:boolean){
      if(event){
        // this.typeTableSelected = 0;
        this.cuentaSelectedSearched = false;
        this.cuentaSelected = 0;
      }

    }
}

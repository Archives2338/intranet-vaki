import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalConfirmComponent } from 'src/app/admin/shared/components/modal-confirm/modal-confirm.component';
import { SalesService } from 'src/app/admin/supplier/sales/services/sales.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModalRenovarComponent } from '../modal-renovar/modal-renovar.component';

@Component({
  selector: 'app-table-mis-ventas',
  templateUrl: './table-mis-ventass.component.html',
  styleUrls: ['./table-mis-ventass.component.scss']
})
export class TableMisVentasComponent implements OnInit {
  constructor( private snackBar: MatSnackBar,private services:SalesService, private dialog:MatDialog) { }
  ngOnInit(): void {
    // this.getSaleAccountComplete();
  }
@Input() set data(data: any){
  console.log("dataInput",data)
  this.sortServiceData = data.data.info;
  this.namePlatform = data.type;
}

 public namePlatform: string = "Cuentas Completas";
 public group: number = 10;
  public search: string = '';
  public page!: number;
  public size: number = 0;
  public filterTable: string = '';
  public sortServiceData : Array<any> = [];
  public columsTable : string[] = ['ID', 'Cliente', 'Correo','Plataforma','Costo','Estado','Dias Vencidos' ,'Fecha de Cobro','Acciones'];
  public tooltip:string = 'Fecha de Vencimiento de la Cuenta ';
  public loading: boolean = false;
  public isAsc: boolean = true;



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
  public orderSort = (a: any, b: any) => {
    if (this.isAsc) {
      return a > b ? 1 : -1;
    } else {
      return a < b ? 1 : -1;
    }
  }


  openModalConfirm(id_supplier_service:number){
    this.dialog.open(ModalConfirmComponent,{
      width:'450px',
      height:'350px',
      panelClass:'dialog-clientPlatform',
      data: {title: 'Estas seguro de realizar esta accion?'}
    }).afterClosed().subscribe((res)=>{
      // console.log("res",res)
      if(res){
        this.deleteSale(id_supplier_service)
        // // console.log("res",res)

      }
    })


  }

  deleteSale(id_supplier_service:number){


    let body ={
      id_supplier_service:id_supplier_service,

     }

    this.services.deleteSale(body).subscribe((data:any)=>{
      console.log("data",data)
      if(data.status == 400){
        // alert("Error al eliminar la venta")
        this.showSnackBar("Error al eliminar la venta","Importante")
      }else{
        // alert("Venta eliminada con exito")
        this.showSnackBar("Venta eliminada con exito","Cerrar")


        // eliminamos del arreglo la venta eliminada
        this.sortServiceData = this.sortServiceData.filter((item:any)=> item.id_supplier_service != id_supplier_service)


        // // this.getSaleAccountComplete();
      }
    }
    )
  }


  public openModalRenovar(data:any){
    this.dialog.open(ModalRenovarComponent,{
      width:'950px',
      height:'650px',
      panelClass:'dialog-clientPlatform',
      data: data
    })

  }


  showSnackBar(message: string, action: string) {

    this.snackBar.open(message, action , {
      duration: 3000,

    });
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { AccountService } from '../../../../services/account.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalInfoClientplatformComponent } from '../modal-info-clientplatform/modal-info-clientplatform.component';
import { ModalCreatePlatformComponent } from '../modal-create-platform/modal-create-platform.component';
import { ModalEditPlatformComponent } from '../modal-edit-platform/modal-edit-platform.component';

@Component({
  selector: 'app-table-platforms',
  templateUrl: './table-platforms.component.html',
  styleUrls: ['./table-platforms.component.scss']
})
export class TablePlatformsComponent  implements OnInit {
  public loading: boolean = false;
  public id_platform: number = 0;
  public isAsc: boolean = true;
  constructor(public AccountService: AccountService,
              public dialog: MatDialog
              ) { }
  @Input() set selectedValue(value: any){
    console.log("value",value)
    if(value){
      this.sortServiceData = value.info
      this.namePlatform = value.name
      this.id_platform = value.id_platform
    }

  }
  ngOnInit(): void {

    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // this.getInfoPlatform();
    // this.openModalInfoClientPlatform('a')

  }
  public namePlatform: string = "Plataforma";
  public group: number = 10;
  public search: string = '';
  public page!: number;
  public size: number = 0;
  public filterTable: string = '';
  public sortServiceData : Array<any> = [];
  public columsTable : string[] = ['ID', 'Correo Electronico', 'Contraseña','Tipo de Cuenta','Cant. Perfiles','Acciones'];
  tooltip:string = 'Fecha de Vencimiento de la Cuenta ';


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

  public openModalCreatePlatform(data:any){
    console.log("data",data)
    this.dialog.open(ModalCreatePlatformComponent, {
      width: '950px',
      height: '650px',
      panelClass: 'dialog-clientPlatform',
      data: this.id_platform
    }).afterClosed().subscribe((data:any)=>{
      console.log("data",data)
      if(data.confirm){
        this.getInfoPlatform(data.id_platform)
      }
    }
    );
  }

  public openModalEditPlatform(data:any){
    console.log("data",data)

    let dataInfo = {
      id_service: data.id_service,
      id_platform: this.id_platform,
      mail_account: data.email,
      number_profiles: data.cantidad_perfiles,
      state : 0,
      password: data.contrasenia,
      type_account: data.tipo_cuenta,
      date_expiration: data.end_date,
    }
    this.dialog.open(ModalEditPlatformComponent,{
      width: '950px',
      height: '650px',
      panelClass: 'dialog-clientPlatform',
      data: dataInfo
    }).afterClosed().subscribe((data:any)=>{
      console.log("data",data)
      if(data){
        // this.getInfoPlatform(data.id_platform)
      }else{

      }
    }
    );
  }


  public InfoClientPlatformService(dataServices: any){
    this.loading = true;
    this.AccountService.infoClientPlatforms({id_service: dataServices.id_service}).subscribe((data: any)=>{
      this.loading = false;
      this.openModalInfoClientPlatform({
        profiles: dataServices.cantidad_perfiles,
        info: data,
        id_service : dataServices.id_service,
        email : dataServices.email
      });
    })
  }
  public getInfoPlatform(id:any){
    console.log("id_platform",this.id_platform)
    this.loading = true;
    this.AccountService.infoPlatFormsID({id_platform: id.toString()}).subscribe((data:any)=>{
      this.loading = false;
      this.sortServiceData = data.info;
      this.namePlatform = data.name;
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
  public orderSort = (a: any, b: any) => {
    if (this.isAsc) {
      return a > b ? 1 : -1;
    } else {
      return a < b ? 1 : -1;
    }
  }


}

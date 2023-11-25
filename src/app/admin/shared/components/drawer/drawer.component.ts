import { Component, EventEmitter, Output,OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { filter } from 'rxjs/operators';
import { AdminService } from 'src/app/admin/services/admin.service';
import { LocalStorageStoreService } from 'src/app/shared/services/local-storage.service';
@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss']
})
export class DrawerComponent  implements OnInit{
  public panelOpenState: boolean = false;
  public clase: string = 'opened';
  public clase_modulo: string = 'modulo-open';
  srcImage = '';
  public name_supplier!: string;
  public breadcrumbsUrl: any;
  public breadcrumbsUrlLenght!: number
  constructor(    
    private router: Router, 
    private localStorage: LocalStorageStoreService,
    private services:AdminService
    ){
   
    // if (this.localStorage.getItem('infoSupplier')) {
    //   console.log('esta en local storage');
    //   this.name_supplier = JSON.parse(this.localStorage.getItem('infoSupplier') || '{}').name;

    // } else {
    //   this.services.getInfoSupplier().subscribe((data: any) => {
    //     console.log(data);
    //     this.name_supplier = data.name;
    //   this.localStorage.setItem('infoSupplier', JSON.stringify(data));

    //     this.localStorage.setItem('tokenSupplier', JSON.stringify(data))
    //   });

    // }
  }
  ngOnInit(): void {
    // verificamos si esta en local Storage
    this.services.supplierEmitter.subscribe((data)=>{
      this.name_supplier = data.name || '';
      this.srcImage = data.image || '';
    })   


  }
  @Output() cl = new EventEmitter<string>();
  togglePanel() {
    this.panelOpenState = !this.panelOpenState;
  }

  @Output() email = new EventEmitter<string>();
  class(s: string): string {
    let value = '';
    switch (s) {
      case 'drawer':
        value = this.clase;
        break;
      case 'modulo':
        this.clase == 'opened'
          ? (value = this.clase_modulo)
          : (value = 'modulo-close');
        break;
    }
    return value;
  }
  go(m: string, v: string): void {

  }



  oyc(): void {
    if (this.clase == 'opened') {
      this.clase = 'closed';
    } else {
      this.clase = 'opened';
    }
    this.cl.emit(this.clase);
  }

  goToPlatform(){

    this.router.navigate(['admin/services/platforms/']);
  }

  goToCargaFactExp(){

    this.router.navigate(['admin/lotes/fact-exp']);
  }
  goToSeguimientoCliente(){
    this.router.navigate(['admin/client/seguimiento']);
  }
  goToProximosCobros(){
    this.router.navigate(['admin/next-payments']);
  }

  goToMisVentas(){
    this.router.navigate(['admin/sales/mis-ventas/info-ventas']);
  }



  public splitBreadcrumbsUrl(s: string): any {
    let d = s.split('/');
    let w = d.slice(1, 9);
    return w;
  }
}

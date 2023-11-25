import { Component } from '@angular/core';
import { SalesService } from '../../../../services/sales.service';
import { LocalStorageStoreService } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'app-info-ventas',
  templateUrl: './info-ventas.component.html',
  styleUrls: ['./info-ventas.component.scss']
})
export class InfoVentasComponent {
  public namePlatform: string = "Cuentas Completas";
  public loading : boolean = false;
  public sortSaleData : any = [];
  constructor(private services:SalesService, private localStorage:LocalStorageStoreService) { }
  ngOnInit(): void {
    if(this.localStorage.getItem('typeAdd')){
      // obtenemos el valor
      const type = JSON.parse(this.localStorage.getItem('typeAdd') || '{}').type;
      if(type == 'complete'){
        this.getSaleAccountComplete();
      }else{
        this.getSaleAccountCompleteProfile();
      }
    }
  }


  public getSaleAccountComplete = () => {
    this.loading = true;
    this.services.getSalesCompleteAccount().subscribe((data:any)=>{
      this.loading = false;
      console.log("data",data)
      this.sortSaleData = {
        type:'Cuentas Completas',
        data:data
      };
      // AGREGAAMOS AL LOCAL EL VALOR DE TIPO DE CUENTA
      // this.localStorage.setItem('typeAdd', );
      // si tiene de tipo profile lo eliminamos
      if(this.localStorage.getItem('typeAdd')){
        this.localStorage.removeItem('typeAdd');
        this.localStorage.setItem('typeAdd', JSON.stringify({type:'complete'}));
      }else{
        this.localStorage.setItem('typeAdd', JSON.stringify({type:'complete'}));
      }

    })
  }

  public getSaleAccountCompleteProfile = () => {
    this.loading = true;
    this.services.getSaleCompletAccountProfile().subscribe((data:any)=>{
      this.loading = false;
      console.log("data",data)
      this.sortSaleData = {
        type:'Cuentas por Perfiles',
        data:data
      };

      if(this.localStorage.getItem('complete')){
        this.localStorage.removeItem('complete');
        this.localStorage.setItem('typeAdd', JSON.stringify({type:'profile'}));
      }else{
        this.localStorage.setItem('typeAdd', JSON.stringify({type:'profile'}));
      }
    })
  }
}

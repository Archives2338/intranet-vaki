import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SalesService } from '../../../../services/sales.service';

@Component({
  selector: 'app-editar-venta',
  templateUrl: './editar-venta.component.html',
  styleUrls: ['./editar-venta.component.scss']
})
export class EditarVentaComponent implements OnInit{
  public breadcrumbsUrl: any;
  public breadcrumbsUrlLenght!: any
  public infoServiceData :any;
  public mostrar : boolean = false;
  public loading : boolean = false;
  constructor(private router:Router,private services:SalesService) { }
  ngOnInit(): void {

    this.breadcrumbsUrl = this.splitBreadcrumbsUrl(this.router.url);
    this.breadcrumbsUrlLenght = this.breadcrumbsUrl;
    console.log("this.breadcrumbsUrlLenght", this.breadcrumbsUrlLenght)
    this.getInfoSale(this.breadcrumbsUrlLenght[4])
  }
  public getInfoSale(id:any){
    this.loading= true;
    this.services.getInfoVentaPerfilID(id).subscribe((data:any)=>{
      this.loading= false;
      console.log("data",data)
      this.infoServiceData = {
        type: 'edit' ,
        email : id.mail_account,
        data: data[0],
        id_service: id.id_service
      }
      this.mostrar = true;
    })
  }
  public splitBreadcrumbsUrl(s: string): any {
    let d = s.split('/');
    let w = d.slice(1, 9);
    return w;
  }
}

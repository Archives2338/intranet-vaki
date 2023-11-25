import { Component } from '@angular/core';
import { DashboardService } from './services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
public listCobros :any = []
public page: number | undefined;
public mesData : string = ""
public anioData : string = ""
public loading : boolean = false
constructor(private services:DashboardService) {
// obtendremos el nombre del mes Completo
let date = new Date()


this.mesData =  date.toLocaleString('default', { month: 'long' });
this.anioData = date.getFullYear().toString()
// this.getProxCobros()
}


getProxCobros(){
  this.loading = true
  this.services.getProxCobros().subscribe((data:any)=>{
    console.log("data",data)
    this.loading = false
    this.listCobros = data
  }

  )

}

}

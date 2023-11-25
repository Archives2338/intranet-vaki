import { Component } from '@angular/core';
import { DashboardService } from '../dashboard/services/dashboard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-next-payments',
  templateUrl: './next-payments.component.html',
  styleUrls: ['./next-payments.component.scss']
})
export class NextPaymentsComponent {
  public listCobros :any = []
  public page: number | undefined;
  public mesData : string = ""
  public anioData : string = ""
  public loading : boolean = false
  constructor(private services:DashboardService, private router:Router) {
    // obtendremos el nombre del mes Completo
    let date = new Date()


    this.mesData =  date.toLocaleString('default', { month: 'long' });
    this.anioData = date.getFullYear().toString()
    this.getProxCobros()
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

    notificarWhatsapp(data:any){
        let prb = 957805455
        let price_selling = data['price_selling']
        let numero = data['numero']
        let cliente = data['cliente']
        let producto = data['name']
        let email = data['email']

        // let text = `Hola ${name} te recordamos el cobro de tu cuenta que tienes con nosotros por el monto de ${price_selling} soles, si ya realizaste el pago por favor enviar el voucher de pago al correo ${email} para poder validar tu pago.`
        let text = `Hola ${cliente} te recordamos el cobro de tu cuenta  ${producto}  que tienes con nosotros por el monto de ${price_selling}     soles,
                     `


        // let text = "Hola te cordamos el cobro de tu cuenta que tienes con nosotros"
        window.open(`https://api.whatsapp.com/send?phone=${numero}&text=${text}`)
      // window.open(`https://api.whatsapp.com/send?phone=${telefono}&text=Hola%20me%20interesa%20el%20servicio%20de%20Social%20Media%20Manager%20que%20ofreces%20en%20tu%20plataforma%20de%20Social%20Media%20Manager%20y%20me%20gustar%C3%ADa%20saber%20m%C3%A1s%20informaci%C3%B3n%20sobre%20el%20mismo.`)


    }
    goToInfo(id:number){
      // vamos a la info del cliente
      // /client/seguimiento/36
      this.router.navigate([`admin/client/seguimiento/${id}`])
    }
}

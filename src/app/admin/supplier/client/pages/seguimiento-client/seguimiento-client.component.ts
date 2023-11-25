import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService, ICustomer } from '../../services/client.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-seguimiento-client',
  templateUrl: './seguimiento-client.component.html',
  styleUrls: ['./seguimiento-client.component.scss']
})
export class SeguimientoClientComponent {

  id = ''
  sortServiceData : ICustomer[] = []
  haveData = false

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private clientService:ClientService
  ){
    this.route.params.subscribe(params => {
      const idClient = params['id']
      this.id = idClient
    });
  }

  ngOnInit(){
    this.clientService.getSaleSupplier(+this.id).subscribe((data)=>{
      this.sortServiceData = data
      this.haveData = data.length > 0
      this.loading = false
    })
  }


  public namePlatform: string = "Clientes"
  public loading: boolean = true
  public isAsc: boolean = true


  public group: number = 4;
  public search: string = '';
  public page!: number;
  public size: number = 0;
  public filterTable: string = '';

  
  public columsTable = [
    {
      title: 'Cliente',
      key: 'cliente',
      hasFilter: false
    },
    {
      title: 'Servicio',
      key: 'nombre',
      hasFilter: true
    },
    {
      title: 'Correo',
      key: 'correo',
      hasFilter: true
    },
    {
      title: 'Cobro',
      key: 'cobro',
      hasFilter: true
    },
    {
      title: 'Fecha de Cobro',
      key: 'fecha_cobro',
      hasFilter: true
    },
    {
      title: 'Días vencidos',
      key: 'diasVencidos',
      hasFilter: true
    },
    {
      title: 'Estado',
      key: 'estado',
      hasFilter: true
    }
  ]

  handleSort2(nameColumn: string, hasFilter: boolean){
    if(!hasFilter) return
    const name = nameColumn as keyof ICustomer
    const tableSort = this.sortServiceData.sort((a, b) => {
      const compareToA = a[name].toString().toLowerCase()
      const compareToB = b[name].toString().toLowerCase()
      if (compareToA > compareToB) return this.isAsc ? 1 : -1
      if (compareToA < compareToB) return this.isAsc ? -1 : 1
      return 0;
    })
    this.sortServiceData = tableSort
    this.isAsc = !this.isAsc
  }

}

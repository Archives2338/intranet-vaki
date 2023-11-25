import { Component, Input } from '@angular/core';
import { ICustomer } from 'src/app/admin/supplier/client/services/client.service';

@Component({
  selector: 'app-table-info-service',
  templateUrl: './table-info-service.component.html',
  styleUrls: ['./table-info-service.component.scss']
})
export class TableInfoServiceComponent {

  @Input() set data(value: ICustomer[]) {
    this.sortServiceData = value
    this.loading = false
    this.haveData = value.length > 0? true : false
  }

  id = ''
  sortServiceData : ICustomer[] = []
  haveData = false

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

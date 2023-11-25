import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IClient, ClientService, IClientFromExcel } from '../../../../services/client.service';
import { ModalCreateClientComponent } from '../modal-create-client/modal-create-client.component';
import { ModalActionsClientComponent } from '../modal-actions-client/modal-actions-client.component';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-table-clients',
  templateUrl: './table-clients.component.html',
  styleUrls: ['./table-clients.component.scss']
})
export class TableClientsComponent {

  public namePlatform: string = "Clientes"
  public loading: boolean = true
  public sortServiceData : IClient[] = []
  public isAsc: boolean = true
  dataExcel:IClientFromExcel[] = []
  errors: string[] = []
  currentRow = 2

  constructor(
    private clientService:ClientService,
    public dialog: MatDialog
  ) {}


  ngOnInit(): void {
    this.clientService.getClients().subscribe((data)=>{
      this.sortServiceData = data
      this.loading = false;
    })

  }

  public columsTable = [
    {
      title: 'Nombre',
      key: 'name',
      hasFilter: true
    },
    {
      title: 'Apellidos',
      key: 'lastname',
      hasFilter: true
    },
    {
      title: 'Teléfono',
      key: 'phone',
      hasFilter: true
    },
    {
      title: 'Correo',
      key: 'mail',
      hasFilter: true
    },
    {
      title: 'Acciones',
      key: 'actions',
      hasFilter: false
    }
  ]

  public group: number = 4;
  public search: string = '';
  public page: number = 1
  public size: number = 0;
  public filterTable: string = '';

  createClient(){
    this.dialog.open(ModalCreateClientComponent)
  }

  selectClient(idClient:number){
    console.log(idClient)
    this.dialog.open(ModalActionsClientComponent,{
      data: {idClient}
    })
  }

  handleSort2(nameColumn: string, hasFilter: boolean){
    if(!hasFilter) return
    const name = nameColumn as keyof IClient
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

  onFileChange(event: Event) {
    const selectedFile = (event.target as HTMLInputElement).files?.[0]
    const customHeaders = ['name', 'lastname', 'gender', 'prefix', 'phone', 'mail']

    if (selectedFile) {
      const reader = new FileReader()

      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target && e.target.result) {
          const binaryString = e.target.result as string;
          const workbook = XLSX.read(binaryString, { type: 'binary' })

          const sheetName = workbook.SheetNames[0]
          const sheet = workbook.Sheets[sheetName]

          const jsonData = XLSX.utils.sheet_to_json<IClientFromExcel>(sheet,
            { header: customHeaders, range: 1 }
          )

          this.dataExcel = jsonData.map(({ name, lastname,mail,phone,gender, prefix })=>{
            return {
              name:name?.trim() ?? '',
              lastname:lastname?.trim() ?? '',
              mail:mail?.toString().trim() ?? '',
              phone:phone?.toString().trim() ?? '',
              prefix: prefix?.toString().trim() ?? '',
              gender:gender?.toString().trim().toLowerCase() ?? '' 
            }
          })
          this.sendDataFile()

          if(event.target) (event.target as HTMLInputElement).value = ''
        }
      }

      reader.readAsBinaryString(selectedFile);
    }
  }

  sendDataFile(){

    const send = confirm('¿Desea registrar los datos del excel?')
    if(!send) {
      this.dataExcel = []
      return
    }

    this.dataExcel.forEach((client)=>{
      const {name, lastname, phone, gender, prefix} = client

      //validar que los campos no esten vacios
      if(!name) this.emptyErrors('NOMBRE')
      if(!lastname) this.emptyErrors('APELLIDO')
      if(!phone) this.emptyErrors('TELÉFONO')
      if(phone && !prefix) this.emptyErrors('PREFIJO', `Para el número ${phone}`)
      if(gender && !['masculino','femenino'].includes(gender)) this.errors.push(`Fila ${this.currentRow} columna GÉNERO debe ser masculino o femenino`)

      //validar que el nombre tenga mas de 5 caracteres y menos de 10
      if(name.length < 5 || name.length > 10) this.errors.push(`Fila ${this.currentRow} columna NOMBRE debe tener más de 5 y menos de 10 caracteres`)
      //validar que el apellido tenga mas de 5 caracteres y menos de 20
      if(lastname.length < 5 || lastname.length > 20) this.errors.push(`Fila ${this.currentRow} columna APELLIDO debe tener más de 5 y menos de 20 caracteres`)
      //validar que el telefono tenga mínimo 1 y máximo 20 caracteres
      if(phone.length < 1 || phone.length > 20) this.errors.push(`Fila ${this.currentRow} columna TELéFONO debe tener mínimo 1 y máximo 20 caracteres`)
      
      //validar que sea numero
      const phonePattern = /^[0-9]*$/;
      if(!phonePattern.test(phone)) this.errors.push(`Fila ${this.currentRow} columna TELÉFONO debe ser un número`)
      if(!phonePattern.test(prefix)) this.errors.push(`Fila ${this.currentRow} columna PREFIJO debe ser un número`)
      this.currentRow++
    })


    if(this.errors.length > 0){
      alert(this.errors.join('\n'))
      this.dataExcel = []
      this.errors = []
      this.currentRow = 2
      return
    }

    this.clientService.createClientsFromExcel(this.dataExcel).subscribe((data)=>{
      alert(data)
    })

  }

  emptyErrors(column:string,added:string=''){
    this.errors.push(`Fila ${this.currentRow} columna ${column} no puede estar vacio. ${added}`)
  }

}

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, of,forkJoin } from 'rxjs'
import { environment } from 'src/app/shared/parameters';


export interface IClient {
  id: number
  name: string
  lastname: string
  phone: string
  mail: string
  prefix: string
  gender: string
}

interface DTOClient {
  id_client: number
  name: string
  lastname: string
  phone: string
  mail: string
  prefix: string
  gender: string
  id_supplier: number
  id_type_client:number 
}

export interface IClientFromExcel {
  name: string;
  lastname: string;
  phone: string;
  mail: string;
  gender: string;
  prefix: string;
}
interface IResponseCreateClient {
  id_client: number
  message: string
}

interface IResponseCreateClientExcel {
  ids: number[]
  message: string
}


export interface ICustomer {
  cliente: string
  estado: string
  diasVencidos: string
  id_supplier_service: number
  correo: string
  nombre: string
  cobro: string
  fecha_cobro: string
  
}
@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  clients: IClient[] = [];

  url = environment.url_api;
  token = localStorage.getItem('token') ?? '';
  header ={
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Origin': '*',
     Authorization : `Bearer ${this.token}`
  }


  getClients(){
    const url = `${this.url}/client/get-clients`;
    return this.http.get<DTOClient[]>(url, {headers: this.header}).pipe(
      map((data)=>{
        const clients = data.map((client)=>{
          return {
            id: client.id_client,
            name: client.name,
            lastname: client.lastname,
            phone: client.phone,
            mail: client.mail,
            prefix: client.prefix,
            gender: client.gender
          }
        })
        this.clients = []
        this.clients.push(...clients)
        return this.clients
      }));
  }

  getClientById(id:number){
    return this.clients.find((client)=>client.id === id) ?? {
      id: 0,
      name: '',
      lastname: '',
      phone: '',
      mail: '',
      prefix: '',
      gender: 'M'
    }
  }

  createClient(name: string,lastname: string,phone: string,mail: string, prefix:string, gender:string){
    const url = `${this.url}/client/create-client`;
    return this.http.post<IResponseCreateClient>(url, {
      name,
      lastname,
      phone,
      mail,
      prefix,
      gender
    }, {headers: this.header}).pipe(
      map((data)=>{
        const {id_client, message} = data
        this.clients.push({
          id: id_client,
          name,
          lastname,
          phone,
          mail,
          prefix,
          gender
        })
        return message
      })
    )
  }

  updateClient(idClient:number,name: string,lastname: string,phone: string,mail: string, prefix:string, gender:string){
    const url = `${this.url}/client/update-client`;
    return this.http.post<IResponseCreateClient>(url, {
      id_client:idClient,
      name,
      lastname,
      phone,
      mail,
      prefix,
      gender
    }, {headers: this.header}).pipe(
      map((data)=>{
        const {message} = data
        const indexClient = this.clients.findIndex((client)=>client.id === idClient)
        this.clients[indexClient] = {
          id: idClient,
          name,
          lastname,
          phone,
          mail,
          prefix,
          gender
        }
        return message
      })
    )
  }

  createClientsFromExcel(clients:IClientFromExcel[]){
    const clientAllString  = clients.map((client)=>{
      const {phone, gender, prefix} = client
      return {...client, phone: phone.toString(), gender: gender!=='femenino' ? 'M': 'F', prefix: `+${prefix.toString()}`}
    })
    const url = `${this.url}/client/create-client-excel`;
    return this.http.post<IResponseCreateClientExcel>(url, { clients:clientAllString }, {headers: this.header}).pipe(
      map((data)=>{
        const {ids, message} = data
        console.log(ids)
        ids.forEach((id_client,index)=>{
          const {name, lastname, phone, mail, prefix, gender} = clients[index]
          this.clients.push({
            id: id_client,
            name,
            lastname,
            phone: phone.toString(),
            mail,
            prefix,
            gender
          })
        })
        return message
      })
    )
     
  }


  haveThisClient(idClient:string){
    const client = this.clients.find((client)=>client.id.toString() === idClient)
    return client ? true : false
  }

  getSaleSupplier(idClient:number){
    const url = `${this.url}/client/get-client-supplier`;
    return this.http.post<ICustomer[]>(url, {idClient}, {headers: this.header}).pipe(
      map((data)=>data)
    )
  }
  

}

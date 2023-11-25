import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalCreateClientComponent } from '../modal-create-client/modal-create-client.component';
import { ClientService } from '../../../../services/client.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CountriesService, ICountries } from '../../../../services/countries.service';
@Component({
  selector: 'app-modal-actions-client',
  templateUrl: './modal-actions-client.component.html',
  styleUrls: ['./modal-actions-client.component.scss']
})
export class ModalActionsClientComponent {

  formCreate: FormGroup= new FormGroup({});
  validing : boolean = false;
  countries : ICountries[] = [];
  genders: string[] = ['M', 'F'];

  constructor(
    private fb:FormBuilder,
    private dialogRef: MatDialogRef<ModalCreateClientComponent>,
    private clientService: ClientService,
    private countriesService: CountriesService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data : { idClient: number }
  ){}

  ngOnInit(): void {

    const {required,minLength, maxLength, pattern ,email} = Validators
    const {name,lastname,phone,mail, gender, prefix} = this.clientService.getClientById(this.data.idClient)
    const numberPattern = /^[0-9]*$/;
    this.formCreate = this.fb.group({
      name: [name,[required, minLength(5), maxLength(10)]],
      lastname: [lastname,[required, minLength(5), maxLength(20)]],
      phone: [phone,[required,minLength(1), maxLength(20),pattern(numberPattern)]],
      mail: [mail,[email]],
      prefix: [prefix,[required]],
      gender: [gender,[required]],
    })

    if(this.countriesService.allCountries.length === 0){
      this.countriesService.getCountriesToCreateClient().subscribe((data)=>{
        this.countries = data
      })
    }else this.countries = this.countriesService.allCountries
  }

  update(){
    if(!this.formCreate.valid) return alert('Verifique los campos');
    this.validing = true;
    const { name, lastname, phone, mail, prefix, gender } = this.formCreate.value;
    const idClient = this.data.idClient
    this.clientService.updateClient(idClient,name, lastname, phone, mail, prefix, gender)
    .subscribe((message:String)=>{
      // alert(message)
      let value= message
      this.showSnackBar(value.toString(),'Aceptar')
      this.formCreate.reset()
      this.dialogRef.close()
    })

  }



  showSnackBar(message: string, action: string) {

    this.snackBar.open(message, action , {
      duration: 3000,

    });
  }
}

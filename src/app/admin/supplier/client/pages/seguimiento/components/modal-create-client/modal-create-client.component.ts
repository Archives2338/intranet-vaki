import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService, IClient } from '../../../../services/client.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CountriesService, ICountries } from '../../../../services/countries.service';
@Component({
  selector: 'app-modal-create-client',
  templateUrl: './modal-create-client.component.html',
  styleUrls: ['./modal-create-client.component.scss']
})
export class ModalCreateClientComponent {

  formCreate: FormGroup = new FormGroup({});
  countries : ICountries[] = [];
  genders: string[] = ['M', 'F'];
  validing : boolean = false;

  constructor(
    private fb:FormBuilder,
    private dialogRef: MatDialogRef<ModalCreateClientComponent>,
    private clientService: ClientService,
    private countriesService: CountriesService,
    private snackBar: MatSnackBar
  ){}

  ngOnInit(): void {
    const {required,minLength, maxLength, pattern ,email} = Validators
    const numberPattern = /^[0-9]*$/;
    this.formCreate = this.fb.group({
      name: ['',[required, minLength(5), maxLength(10)]],
      lastname: ['',[required, minLength(5), maxLength(20)]],
      phone: ['',[required,minLength(1), maxLength(20),pattern(numberPattern)]],
      mail: ['',[email]],
      prefix: ['+51',[required]],
      gender: ['M',[required]],
    })

    if(this.countriesService.allCountries.length === 0){
      this.countriesService.getCountriesToCreateClient().subscribe((data)=>{
        this.countries = data
      })
    } this.countries = this.countriesService.allCountries
    
  }

  register(){
    if(!this.formCreate.valid) return this.showSnackBar('Verifique los campos','Aceptar');
    this.validing = true;
    const { name, lastname, phone, mail, prefix, gender } = this.formCreate.value;
    this.clientService.createClient(name, lastname, phone, mail, prefix, gender)
    .subscribe((message:String)=>{
      // alert(message)
      this.snackBar.open(message.toString(),'Aceptar')
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

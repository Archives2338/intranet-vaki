import { Component } from '@angular/core';
import {
  FormBuilder,

  FormGroup,

  Validators,

} from '@angular/forms'
import { LandingService, ICustomer } from './services/landing.service';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
  public dataInfoService: ICustomer[] = [];
  public loading: boolean = false
  public formConsulta: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder, private services: LandingService) {

    this.formConsulta = this.formBuilder.group({
      celular : ['',[Validators.required,Validators.minLength(9),Validators.maxLength(10)]],

    })
  }

  getInfoClient(){
    const phone = this.formConsulta.get('celular')?.value;
    this.loading = true
    this.services.getServiceClient(phone).subscribe((data)=>{
      console.log(data);
      this.loading = false
      this.dataInfoService = data
    })
  }



}

import { Component, Input, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,

} from '@angular/forms'
import {ErrorStateMatcher} from '@angular/material/core';


@Component({
  selector: 'app-platforms',
  templateUrl: './platforms.component.html',
  styleUrls: ['./platforms.component.scss']
})
export class PlatformsComponent  implements OnInit{
  selected = new FormControl('', [Validators.required, Validators.pattern('valid')]);
  public selectPlatform: FormGroup = this.fb.group({});

  public infoPlatform : any
  public platForms : any = [];
  public loading: boolean = false;

  constructor(public AccountService: AccountService, private fb: FormBuilder) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getPlatforms();
    this.selectPlatform = this.fb.group({
      platform: ['', Validators.required]
    });

  }

  searchPlatform(){
    console.log("Searching", this.selectPlatform.value.platform)
    this.getPlatformsId();
  }



  getPlatforms(){
    this.loading = true;
    this.AccountService.getPlatforms().subscribe((data:any)=>{
      console.log("data",data);
      this.loading = false;
      // si la data es n arreglo
      if(Array.isArray(data)){
        this.platForms = data
      }else{
        alert("No hay plataformas consulte al administrador")
      }


    });
  }

  getPlatformsId(){
    this.loading = true;
    let value = this.selectPlatform.value.platform;
    // convertimos a string
    let id = value.toString();
    this.AccountService.infoPlatFormsID({ "id_platform":id }).subscribe((data:any)=>{
      this.loading = false;

      console.log("data",data)
      this.infoPlatform = data

    });
  }
}

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalServiceComponent } from './components/modal-service/modal-service.component';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from './pages/auth/services/login.service';
import { LocalStorageStoreService } from '../shared/services/local-storage.service';

@Component({
  selector: 'app-e-commerce',
  templateUrl: './e-commerce.component.html',
  styleUrls: ['./e-commerce.component.scss']
})
export class ECommerceComponent  implements OnInit {
  stateAcordeon = false;
  img = '';
  @ViewChild('swiperEleme', { static: false }) swiperEleme?: ElementRef;
  @ViewChild('swiperElem2', { static: false }) swiperElem2?: ElementRef;
  @ViewChild('swiperElem3', { static: false }) swiperElem3?: ElementRef;
  @ViewChild('swiperElem4', { static: false }) swiperElem4?: ElementRef;
  constructor(private dialog:MatDialog, private loginService:LoginService) {

   }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.recorrerArray();

    setTimeout(() => {
      this.validateGoogleToken();
    }, 1500);

    // this.showData();
  }
  validateGoogleToken(){
    console.log("entre al validateGoogleToken")
    this.loginService.authUser().subscribe((data:any)=>{
      console.log("data",data)
      if(data.token){
        console.log("entre al if")
       localStorage.setItem('tokenEcommerce',data.token);
       // por ahora
       localStorage.setItem('picture',data.picture);
       setTimeout(() => {
         this.showData();
        }, 1500);

      //  this.showData();
      }
    })
  }


  showData(){
    console.log("entre al show data")

    // let value= this.loginService.getProfile();
    // console.log(value);
    // if(value){
    //   this.img = value['picture'];
    //   console.log("img",this.img)
    // }

      let valuePicture = localStorage.getItem('picture');
      if(valuePicture){
        this.img = valuePicture;
      }

  }

  ngAfterViewInit() {
    if (!this.swiperEleme) return;
    const swiperEl = this.swiperEleme.nativeElement;
    const swiperEl2 = this.swiperElem2?.nativeElement;
    const swiperEl3 = this.swiperElem3?.nativeElement;
    const swiperEl4 = this.swiperElem4?.nativeElement;
    // creamos otro objeto con las propiedades de swiper

    Object.assign(swiperEl, {
      slidesPerView: 1,

      loop:true,
      // creamos un ref de navigation

      breakpoints: {
        '@0.00': {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        '@0.90': {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        '@1.50': {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        '@1.80': {
          slidesPerView:4,
          spaceBetween: 10,
        },
      },
    });
    Object.assign([swiperEl2,swiperEl3,swiperEl4], {
      slidesPerView: 1,
      spaceBetween: 10,
      loop : true,
      autoplay : {
        delay : 1000
      },

      breakpoints: {
        '@0.00': {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        '@0.90': {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        '@1.50': {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        '@1.80': {
          slidesPerView:4,
          spaceBetween: 50,
        },
      },
    });
    swiperEl.initialize();
    swiperEl2.initialize();
    swiperEl3.initialize();
    swiperEl4.initialize();
    this.navigate();
  }
  // crearemos un loop de strings
  // para ello crearemos un array de strings
  // y luego lo recorreremos con un ngFor

  // array de strings
  arrayStrings: string[] = [ 'Hen**18 compro hace 5 minutos', 'Vit**19 compró hace 20 minutos' , 'Franc**29s compró hace 50 minutos', 'Reb**24 compró hace 10 minutos' , 'Jua**2 compró hace 20 minutos'];

  // arrayStrings: string[] = [ 'Hen**18 compro hace 5 minutos', 'Vit**19 compró hace 20 minutos' ];

  // ahora usamos un setinterval y recorreremos los valores del array
  // cada 3 segundos
  // para ello creamos un indice
  indice: number = 0;

  // creamos una funcion que se ejecutara cada 3 segundos
  // y que recorrera el array
  recorrerArray() {
    // cada 3 segundos
    setInterval(() => {
      // si el indice es menor a la longitud del array
      if (this.indice < this.arrayStrings.length) {
        // aumentamos el indice
       if(this.indice +1 < this.arrayStrings.length){
        this.indice++;}else{
          this.indice = 0;
        }

      } else {
        // si no, lo reiniciamos
        this.indice = 0;
      }

    }, 3000);
  }


  // creamos una funcion para navegar el swiper con los botones de referencia que creamos


  navigate(){
    // console.log("entreee al navigate")
    // creamos una variable que contenga el swiper
    const swiper = this.swiperEleme?.nativeElement.swiper;
    // creamos una funcion que nos permita navegar el swiper
    // swiper.slideNext();
    // creamos un intervalo de 3 segundos para que se ejecute la funcion
    setInterval(() => {
      swiper.slideNext();
      console.log("entreee al navigate")
    }, 2000);
  }
  viewMore(){
    this.stateAcordeon = !this.stateAcordeon;
  }

  public openModal(): void {
    console.log("entreee al openModal");

    this.dialog.open(ModalServiceComponent, {
      width: '608px',
      height: '552px',
      panelClass: 'dialog-service',
      data:{
        title: 'Servicio',
        cancelText: 'Cancelar',
        confirmText: 'Confirmar',
        description: 'Estas seguro de realizar esta accion?'
      }
    });


  }

}

// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import {
  Component,
  Inject,
  OnInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// import Swiper from 'swiper';
// import 'swiper/scss'; // Importa los estilos de Swiper
// import { Navigation, Pagination } from 'swiper/modules';
// import Swiper and modules styles
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';

@Component({
  selector: 'app-modal-info-clientplatform',
  templateUrl: './modal-info-clientplatform.component.html',
  styleUrls: ['./modal-info-clientplatform.component.scss'],
})
export class ModalInfoClientplatformComponent implements OnInit {
  @ViewChild('swiperElem', { static: false }) swiperElem?: ElementRef;

  // creamos un array
  arrayDataPerson: any = [];
  arrayCantPerfiles: any = [];
  cantPerfiles: number = 0;
  typeModal: number = 1;
  infoServiceData: any;
  id_service: number = 0;
  position : number = 0;
  email: string = '';
  constructor(
    public dialogRef: MatDialogRef<ModalInfoClientplatformComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {

    console.log('data', this.data);

    this.cantPerfiles = this.data.profiles;
    this.arrayDataPerson = this.data.info;
    this.id_service = this.data.id_service;
    this.email = this.data.email;
    // llenamos el arreglo de dataPerson con la cantidad de perfiles
    for (let index = 0; index < this.cantPerfiles; index++) {
      this.arrayCantPerfiles.push({
        id_client: index + 1,
        state: 'libre',
        date: '',
        name: 'libre',
        pin_profile: '',
        status: undefined,
        price_selling: undefined,
        id_supplier_service:''
      });
    }
    // reemplazamos los valores del arreglo dataPerson por la data que viene del servicio
    console.log('data array person', this.arrayDataPerson);
    for (let index = 0; index < this.arrayDataPerson.length; index++) {
      const element = this.arrayDataPerson[index];
      console.log('element', element);
      this.arrayCantPerfiles[index].id_client = element.id_cliente;
      this.arrayCantPerfiles[index].state = 'ocupado';
      this.arrayCantPerfiles[index].date = formatDate(element.end_date);
      this.arrayCantPerfiles[index].name = element.name;
      this.arrayCantPerfiles[index].pin_profile = element.pin_profile;
      this.arrayCantPerfiles[index].status = element.status;
      this.arrayCantPerfiles[index].price_selling = element.price_selling;
      this.arrayCantPerfiles[index].id_supplier_service = element.id_supplier_service;


    }

    console.log('arrayCantPerfiles', this.arrayCantPerfiles);
  }

  ngAfterViewInit() {
    if (!this.swiperElem) return;
    const swiperEl = this.swiperElem.nativeElement;

    // creamos otro objeto con las propiedades de swiper

    Object.assign(swiperEl, {
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
          slidesPerView: calculateSlides(this.cantPerfiles),
          spaceBetween: 50,
        },
      },
    });

    swiperEl.initialize();

  }

  typeModalChange(type: any,x:number) {
    this.position = x;
    this.typeModal = type.name == 'libre' ? 3 : 2;
    if (type.name == 'libre') {
      this.infoServiceData = {
        type: type.name == 'libre' ? 'add' : 'edit',
        data: type,
        id_service: this.id_service,
        email: this.email,
      };
    } else {

      // convert  string dd/MM/YYYY to date yyyy-MM-dd
      let newDateString = type.date.split('/').reverse().join('-');

      let prueba = new Date(type.date);
      console.log('', type);

      type.end_date = newDateString;

      type.email = this.email;
      this.infoServiceData = {
        type: type.name == 'libre' ? 'add' : 'edit',
        data: type,
        id_service: this.id_service,
      };
    }
  }

  public methodEvent(event: any) {
    // console.log('event', event);
    if (event == true) {

      this.typeModal = 1;
      // inicializamos el swiper
    }

    // si event es un objeto
    if (typeof event === 'object') {
      console.log('event', event);
      // agregamos el objeto que viene a this.,array

      // reemplazamos el objeto que iene state libre
      const index =
        this.typeModal == 3
          ? this.arrayCantPerfiles.findIndex(
              (element: any) => element.state == 'libre'
            )
          :this.position

      this.arrayCantPerfiles[index].id_client = event.id_client;
      this.arrayCantPerfiles[index].state = 'ocupado';
      this.arrayCantPerfiles[index].date = formatDate(event.end_date);
      this.arrayCantPerfiles[index].name = event.name;
      this.arrayCantPerfiles[index].pin_profile = event.pin_profile;
      this.arrayCantPerfiles[index].status = event.status;
      this.arrayCantPerfiles[index].price_selling = event.price_selling;
      this.arrayCantPerfiles[index].id_supplier_service = event.id_supplier_service;
      this.typeModal = 1;
    }else{
      this.typeModal = 1;
    }
  }
}

function formatDate(date: string) {
  // format dd/mm/yyyy
  let dateArray = date.split('-');
  let day = dateArray[2];
  let month = dateArray[1];
  let year = dateArray[0];
  return `${day}/${month}/${year}`;
}

function calculateSlides(cant: number) {
  let slidesxview = 0;
  // si es mayor a 5
  if (cant >= 5) {
    slidesxview = 4;
  } else {
    slidesxview = cant;
  }
  return slidesxview;
}

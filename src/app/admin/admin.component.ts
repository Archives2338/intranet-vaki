import { Component, Input, OnInit } from '@angular/core';
import { AdminService } from './services/admin.service';
import { LocalStorageStoreService } from '../shared/services/local-storage.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  constructor(private services: AdminService, private localStorage: LocalStorageStoreService) { }
  ngOnInit(): void {
    // verificamos si esta en local storage
    // if (this.localStorage.getItem('infoSupplier')) {

    // } else {


    // }
    this.services.getInfoSupplier().subscribe((data: any) => {
      this.localStorage.setItem('infoSupplier', JSON.stringify(data));
      this.localStorage.setItem('tokenSupplier', JSON.stringify(data))
    });

  }

  public clase: string = 'max';
    oyc(s: string): void {
    if (s == 'opened') {
      this.clase = 'max';
    } else {
      this.clase = 'min';
    }
  }
  @Input() class_item = ''
  public openModal: boolean = true;

  closeModalTypeFiles($event: boolean) {
    this.openModal = $event;
  }

  openModalContacto() {
    this.openModal = true;
  }
  class(): string {
    return this.clase;
  }

}

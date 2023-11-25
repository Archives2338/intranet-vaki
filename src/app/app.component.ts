import { Component, OnInit } from '@angular/core';
import { AdminService } from './admin/services/admin.service';
import { LocalStorageStoreService } from './shared/services/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'red-notedef';
  constructor(private services:AdminService, private localStorage:LocalStorageStoreService) {



  }
  ngOnInit():void{
    this.services.getInfoSupplier().subscribe((data: any) => {
      console.log(data);
      this.localStorage.setItem('tokenSupplier', JSON.stringify(data))
      // lo guardamos en local
      this.localStorage.setItem('infoSupplier', JSON.stringify(data));
    });
  }


}

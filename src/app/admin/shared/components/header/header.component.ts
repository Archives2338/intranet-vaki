import { Component, Input } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AdminService } from 'src/app/admin/services/admin.service';
import { LocalStorageStoreService } from 'src/app/shared/services/local-storage.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input()

  public name_supplier!: string;
  srcImage = '';
  public breadcrumbsUrl: any;
  public breadcrumbsUrlLenght!: number
  private subscriptions: Subscription[] = [];
  constructor(
    private router: Router, 
    private adminService: AdminService,
    private localStorage: LocalStorageStoreService
  ) {}
    ngOnInit(): void {

      this.breadcrumbsUrl = this.splitBreadcrumbsUrl(this.router.url);
      this.breadcrumbsUrlLenght = this.breadcrumbsUrl;
      console.log("this.breadcrumbsUrlLenght", this.breadcrumbsUrlLenght)
      const sub01 = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((res) => {
        const { url } = res as NavigationEnd;
        this.breadcrumbsUrl = this.splitBreadcrumbsUrl(url);
      });


      this.adminService.supplierEmitter.subscribe((data)=>{
        this.name_supplier = data.name || '';
        this.srcImage = data.image || '';
      })

      // if (this.localStorage.getItem('infoSupplier')) {
      //   console.log('esta en local storage');
      //   this.name_supplier = JSON.parse(this.localStorage.getItem('infoSupplier') || '{}').name;

      // } else {


      // }
    }



  logout(): void {
    // const token = this.sharedService.getStorage('token');
    localStorage.clear();
    this.router.navigate(['/auth']);

  }
  public splitBreadcrumbsUrl(s: string): any {
    let d = s.split('/');
    let w = d.slice(1, 9);
    return w;
  }
}

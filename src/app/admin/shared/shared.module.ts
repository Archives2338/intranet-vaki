
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterModule } from '@angular/router';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatStepperModule } from '@angular/material/stepper';
import { MatRadioModule } from '@angular/material/radio';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { DrawerComponent } from './components/drawer/drawer.component';
import { HeaderComponent } from './components/header/header.component';

import { LoadingComponent } from './components/loading/loading.component';
import { ModalConfirmComponent } from './components/modal-confirm/modal-confirm.component';
import { FilterPipe } from './pipes/filter.pipe';
import { FormClientComponent } from './components/form-client/form-client.component';
import { FormVentaComponent } from './components/form-venta/form-venta.component';
import { FormEditVentaComponent } from './components/form-edit-venta/form-edit-venta.component';
import { FechadiaPipe } from './pipes/fechadia.pipe';
import { FechamesPipe } from './pipes/fechames.pipe';
import { FechamesCompletoPipe } from './pipes/fechames-completo.pipe';



const components = [
  DrawerComponent,
  HeaderComponent,
  LoadingComponent
];

const pipes = [
  FilterPipe
]

const mat_modules = [
  MatMenuModule,
  MatIconModule,
  MatExpansionModule,
  MatButtonModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatNativeDateModule,
  MatInputModule,
  FormsModule,
  ReactiveFormsModule,
  MatPaginatorModule,
  MatSelectModule,
  MatSortModule,
  MatDialogModule,
  MatCheckboxModule,
  MatStepperModule,
  MatRadioModule,
  MatTooltipModule,
  MatAutocompleteModule,
  MatDividerModule,
  MatTabsModule,
  MatSidenavModule,
  MatSlideToggleModule,
  NgxPaginationModule,
  PdfViewerModule,
  MatSnackBarModule

];

@NgModule({
  declarations: [
    DrawerComponent,
    HeaderComponent,

    LoadingComponent,
    ModalConfirmComponent,
    FilterPipe,
    FormClientComponent,
    FormVentaComponent,
    FormEditVentaComponent,
    FechadiaPipe,
    FechamesPipe,
    FechamesCompletoPipe
  ],
  imports: [
    CommonModule, RouterModule,mat_modules,
  ],
  exports: [mat_modules,components,FilterPipe,FormVentaComponent,FormEditVentaComponent,FechamesPipe,FechadiaPipe]
})
export class SharedModule { }

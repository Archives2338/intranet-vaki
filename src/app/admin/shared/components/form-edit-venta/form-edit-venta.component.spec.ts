import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEditVentaComponent } from './form-edit-venta.component';

describe('FormEditVentaComponent', () => {
  let component: FormEditVentaComponent;
  let fixture: ComponentFixture<FormEditVentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormEditVentaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormEditVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

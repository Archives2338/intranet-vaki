import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableMisVentassComponent } from './table-mis-ventass.component';

describe('TableMisVentassComponent', () => {
  let component: TableMisVentassComponent;
  let fixture: ComponentFixture<TableMisVentassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableMisVentassComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableMisVentassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

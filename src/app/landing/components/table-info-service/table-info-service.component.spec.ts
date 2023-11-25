import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableInfoServiceComponent } from './table-info-service.component';

describe('TableInfoServiceComponent', () => {
  let component: TableInfoServiceComponent;
  let fixture: ComponentFixture<TableInfoServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableInfoServiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableInfoServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

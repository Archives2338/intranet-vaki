import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextPaymentsComponent } from './next-payments.component';

describe('NextPaymentsComponent', () => {
  let component: NextPaymentsComponent;
  let fixture: ComponentFixture<NextPaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NextPaymentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NextPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

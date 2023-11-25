import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalInfoClientplatformComponent } from './modal-info-clientplatform.component';

describe('ModalInfoClientplatformComponent', () => {
  let component: ModalInfoClientplatformComponent;
  let fixture: ComponentFixture<ModalInfoClientplatformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalInfoClientplatformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalInfoClientplatformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

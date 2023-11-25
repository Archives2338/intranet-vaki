import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCreatePlatformComponent } from './modal-create-platform.component';

describe('ModalCreatePlatformComponent', () => {
  let component: ModalCreatePlatformComponent;
  let fixture: ComponentFixture<ModalCreatePlatformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCreatePlatformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCreatePlatformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

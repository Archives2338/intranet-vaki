import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditPlatformComponent } from './modal-edit-platform.component';

describe('ModalEditPlatformComponent', () => {
  let component: ModalEditPlatformComponent;
  let fixture: ComponentFixture<ModalEditPlatformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditPlatformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalEditPlatformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablePlatformsComponent } from './table-platforms.component';

describe('TablePlatformsComponent', () => {
  let component: TablePlatformsComponent;
  let fixture: ComponentFixture<TablePlatformsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablePlatformsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablePlatformsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

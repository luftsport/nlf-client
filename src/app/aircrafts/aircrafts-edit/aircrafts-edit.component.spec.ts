import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AircraftsEditComponent } from './aircrafts-edit.component';

describe('AircraftsEditComponent', () => {
  let component: AircraftsEditComponent;
  let fixture: ComponentFixture<AircraftsEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AircraftsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AircraftsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

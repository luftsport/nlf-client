import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AircraftsEditPageComponent } from './aircrafts-edit-page.component';

describe('AircraftsEditPageComponent', () => {
  let component: AircraftsEditPageComponent;
  let fixture: ComponentFixture<AircraftsEditPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AircraftsEditPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AircraftsEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

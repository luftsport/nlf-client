import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NlfAipAirportNearComponent } from './aip-airport-near.component';

describe('NlfAipAirportNearComponent', () => {
  let component: NlfAipAirportNearComponent;
  let fixture: ComponentFixture<NlfAipAirportNearComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfAipAirportNearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfAipAirportNearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

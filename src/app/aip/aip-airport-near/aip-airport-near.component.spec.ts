import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfAipAirportNearComponent } from './aip-airport-near.component';

describe('NlfAipAirportNearComponent', () => {
  let component: NlfAipAirportNearComponent;
  let fixture: ComponentFixture<NlfAipAirportNearComponent>;

  beforeEach(async(() => {
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

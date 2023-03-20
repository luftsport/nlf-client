import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NlfAircraftSummaryComponent } from './aircraft-summary.component';

describe('NlfAircraftSummaryComponent', () => {
  let component: NlfAircraftSummaryComponent;
  let fixture: ComponentFixture<NlfAircraftSummaryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfAircraftSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfAircraftSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

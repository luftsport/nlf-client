import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NlfOrsReportWeatherComponent } from './report-weather.component';

describe('NlfOrsFallskjermReportWeatherComponent', () => {
  let component: NlfOrsReportWeatherComponent;
  let fixture: ComponentFixture<NlfOrsReportWeatherComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsReportWeatherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsReportWeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

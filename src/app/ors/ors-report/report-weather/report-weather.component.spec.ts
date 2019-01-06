import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfOrsFallskjermReportWeatherComponent } from './report-weather.component';

describe('NlfOrsFallskjermReportWeatherComponent', () => {
  let component: NlfOrsFallskjermReportWeatherComponent;
  let fixture: ComponentFixture<NlfOrsFallskjermReportWeatherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsFallskjermReportWeatherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsFallskjermReportWeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

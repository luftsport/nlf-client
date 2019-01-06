import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfOrsFallskjermReportRelatedComponent } from './report-related.component';

describe('NlfOrsFallskjermReportRelatedComponent', () => {
  let component: NlfOrsFallskjermReportRelatedComponent;
  let fixture: ComponentFixture<NlfOrsFallskjermReportRelatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsFallskjermReportRelatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsFallskjermReportRelatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

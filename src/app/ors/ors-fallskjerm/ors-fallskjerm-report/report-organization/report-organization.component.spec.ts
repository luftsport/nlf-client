import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NlfOrsFallskjermReportOrganizationComponent } from './report-organization.component';

describe('NlfOrsFallskjermReportOrganizationComponent', () => {
  let component: NlfOrsFallskjermReportOrganizationComponent;
  let fixture: ComponentFixture<NlfOrsFallskjermReportOrganizationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsFallskjermReportOrganizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsFallskjermReportOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NlfOrsModellflyReportOrganizationComponent } from './report-organization.component';

describe('NlfOrsModellflyReportOrganizationComponent', () => {
  let component: NlfOrsModellflyReportOrganizationComponent;
  let fixture: ComponentFixture<NlfOrsModellflyReportOrganizationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsModellflyReportOrganizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsModellflyReportOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

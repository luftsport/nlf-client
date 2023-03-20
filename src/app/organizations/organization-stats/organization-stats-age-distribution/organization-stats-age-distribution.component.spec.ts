import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NlfOrganizationStatsAgeDistributionComponent } from './organization-stats-age-distribution.component';

describe('NlfOrganizationStatsAgeDistributionComponent', () => {
  let component: NlfOrganizationStatsAgeDistributionComponent;
  let fixture: ComponentFixture<NlfOrganizationStatsAgeDistributionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrganizationStatsAgeDistributionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrganizationStatsAgeDistributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

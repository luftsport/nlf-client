import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NlfOrganizationStatsPopulationPyramidComponent } from './organization-stats-population-pyramid.component';

describe('NlfOrganizationStatsPopulationPyramidComponent', () => {
  let component: NlfOrganizationStatsPopulationPyramidComponent;
  let fixture: ComponentFixture<NlfOrganizationStatsPopulationPyramidComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrganizationStatsPopulationPyramidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrganizationStatsPopulationPyramidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

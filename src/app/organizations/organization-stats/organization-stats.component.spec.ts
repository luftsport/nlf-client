import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfOrganizationStatsComponent } from './organization-stats.component';

describe('NlfOrganizationStatsComponent', () => {
  let component: NlfOrganizationStatsComponent;
  let fixture: ComponentFixture<NlfOrganizationStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrganizationStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrganizationStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

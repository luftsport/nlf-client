import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NlfOrganizationStatsSankeyComponent } from './organization-stats-sankey.component';

describe('NlfOrganizationStatsSankeyComponent', () => {
  let component: NlfOrganizationStatsSankeyComponent;
  let fixture: ComponentFixture<NlfOrganizationStatsSankeyComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrganizationStatsSankeyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrganizationStatsSankeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

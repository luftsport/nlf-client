import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfOrganizationStatsSankeyComponent } from './organization-stats-sankey.component';

describe('NlfOrganizationStatsSankeyComponent', () => {
  let component: NlfOrganizationStatsSankeyComponent;
  let fixture: ComponentFixture<NlfOrganizationStatsSankeyComponent>;

  beforeEach(async(() => {
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

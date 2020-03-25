import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfOrganizationsStatsDotComponent } from './organizations-stats-dot.component';

describe('NlfOrganizationsStatsDotComponent', () => {
  let component: NlfOrganizationsStatsDotComponent;
  let fixture: ComponentFixture<NlfOrganizationsStatsDotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrganizationsStatsDotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrganizationsStatsDotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

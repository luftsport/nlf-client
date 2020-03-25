import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfOrganizationAircraftsComponent } from './organization-aircrafts.component';

describe('NlfOrganizationAircraftsComponent', () => {
  let component: NlfOrganizationAircraftsComponent;
  let fixture: ComponentFixture<NlfOrganizationAircraftsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrganizationAircraftsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrganizationAircraftsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

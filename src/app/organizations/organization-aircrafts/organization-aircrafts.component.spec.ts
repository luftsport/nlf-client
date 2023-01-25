import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NlfOrganizationAircraftsComponent } from './organization-aircrafts.component';

describe('NlfOrganizationAircraftsComponent', () => {
  let component: NlfOrganizationAircraftsComponent;
  let fixture: ComponentFixture<NlfOrganizationAircraftsComponent>;

  beforeEach(waitForAsync(() => {
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

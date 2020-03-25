import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfOrganizationLocationsComponent } from './organization-locations.component';

describe('NlfOrganizationLocationsComponent', () => {
  let component: NlfOrganizationLocationsComponent;
  let fixture: ComponentFixture<NlfOrganizationLocationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrganizationLocationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrganizationLocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

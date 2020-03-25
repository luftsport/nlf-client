import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfOrganizationLocationsEditComponent } from './organization-locations-edit.component';

describe('NlfOrganizationLocationsEditComponent', () => {
  let component: NlfOrganizationLocationsEditComponent;
  let fixture: ComponentFixture<NlfOrganizationLocationsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrganizationLocationsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrganizationLocationsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

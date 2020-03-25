import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfOrganizationFunctionsComponent } from './organization-functions.component';

describe('NlfOrganizationFunctionsComponent', () => {
  let component: NlfOrganizationFunctionsComponent;
  let fixture: ComponentFixture<NlfOrganizationFunctionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrganizationFunctionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrganizationFunctionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

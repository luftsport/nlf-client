import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NlfOrganizationDetailsComponent } from './organization-details.component';

describe('NlfOrganizationDetailsComponent', () => {
  let component: NlfOrganizationDetailsComponent;
  let fixture: ComponentFixture<NlfOrganizationDetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrganizationDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrganizationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

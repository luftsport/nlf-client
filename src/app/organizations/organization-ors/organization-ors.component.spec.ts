import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfOrganizationOrsComponent } from './organization-ors.component';

describe('NlfOrganizationOrsComponent', () => {
  let component: NlfOrganizationOrsComponent;
  let fixture: ComponentFixture<NlfOrganizationOrsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrganizationOrsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrganizationOrsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

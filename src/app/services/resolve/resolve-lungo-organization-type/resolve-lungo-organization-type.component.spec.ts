import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ResolveLungoOrganizationTypeComponent } from './resolve-lungo-organization-type.component';

describe('ResolveLungoOrganizationTypeComponent', () => {
  let component: ResolveLungoOrganizationTypeComponent;
  let fixture: ComponentFixture<ResolveLungoOrganizationTypeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ResolveLungoOrganizationTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResolveLungoOrganizationTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

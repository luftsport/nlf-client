import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ResolveLungoOrganizationComponent } from './resolve-lungo-organization.component';

describe('ResolveLungoOrganizationComponent', () => {
  let component: ResolveLungoOrganizationComponent;
  let fixture: ComponentFixture<ResolveLungoOrganizationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ResolveLungoOrganizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResolveLungoOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

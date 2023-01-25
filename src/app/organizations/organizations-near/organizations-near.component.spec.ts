import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OrganizationsNearComponent } from './organizations-near.component';

describe('OrganizationsNearComponent', () => {
  let component: OrganizationsNearComponent;
  let fixture: ComponentFixture<OrganizationsNearComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationsNearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationsNearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

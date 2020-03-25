import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationsNearComponent } from './organizations-near.component';

describe('OrganizationsNearComponent', () => {
  let component: OrganizationsNearComponent;
  let fixture: ComponentFixture<OrganizationsNearComponent>;

  beforeEach(async(() => {
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

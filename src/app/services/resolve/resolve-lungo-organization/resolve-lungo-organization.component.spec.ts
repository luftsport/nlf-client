import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResolveLungoOrganizationComponent } from './resolve-lungo-organization.component';

describe('ResolveLungoOrganizationComponent', () => {
  let component: ResolveLungoOrganizationComponent;
  let fixture: ComponentFixture<ResolveLungoOrganizationComponent>;

  beforeEach(async(() => {
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

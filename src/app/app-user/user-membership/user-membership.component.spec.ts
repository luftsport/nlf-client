import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppUserMembershipComponent } from './app-user-membership.component';

describe('AppUserMembershipComponent', () => {
  let component: AppUserMembershipComponent;
  let fixture: ComponentFixture<AppUserMembershipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppUserMembershipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppUserMembershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

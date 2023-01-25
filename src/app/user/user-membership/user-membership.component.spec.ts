import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NlfUserMembershipComponent } from './user-membership.component';

describe('NlfUserMembershipComponent', () => {
  let component: NlfUserMembershipComponent;
  let fixture: ComponentFixture<NlfUserMembershipComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfUserMembershipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfUserMembershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

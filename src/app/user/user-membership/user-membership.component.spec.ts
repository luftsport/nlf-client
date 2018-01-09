import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfUserMembershipComponent } from './user-membership.component';

describe('NlfUserMembershipComponent', () => {
  let component: NlfUserMembershipComponent;
  let fixture: ComponentFixture<NlfUserMembershipComponent>;

  beforeEach(async(() => {
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

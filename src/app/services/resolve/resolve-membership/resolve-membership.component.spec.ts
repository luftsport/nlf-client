import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ResolveMembershipComponent } from './resolve-membership.component';

describe('ResolveMembershipComponent', () => {
  let component: ResolveMembershipComponent;
  let fixture: ComponentFixture<ResolveMembershipComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ResolveMembershipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResolveMembershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

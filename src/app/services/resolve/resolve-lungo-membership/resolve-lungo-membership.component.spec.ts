import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NlfResolveLungoMembershipComponent } from './resolve-lungo-function.component';

describe('NlfResolveLungoMembershipComponent', () => {
  let component: NlfResolveLungoMembershipComponent;
  let fixture: ComponentFixture<NlfResolveLungoMembershipComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfResolveLungoMembershipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfResolveLungoMembershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

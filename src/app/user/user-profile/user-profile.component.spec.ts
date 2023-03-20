import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NlfUserProfileComponent } from './user-profile.component';

describe('NlfUserProfileComponent', () => {
  let component: NlfUserProfileComponent;
  let fixture: ComponentFixture<NlfUserProfileComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfUserProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfUserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

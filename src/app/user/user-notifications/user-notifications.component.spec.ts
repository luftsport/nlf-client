import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NlfUserNotificationsComponent } from './user-notifications.component';

describe('NlfUserNotificationsComponent', () => {
  let component: NlfUserNotificationsComponent;
  let fixture: ComponentFixture<NlfUserNotificationsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfUserNotificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfUserNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

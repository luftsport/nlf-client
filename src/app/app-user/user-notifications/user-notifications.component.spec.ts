import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppUserNotificationsComponent } from './app-user-notifications.component';

describe('AppUserNotificationsComponent', () => {
  let component: AppUserNotificationsComponent;
  let fixture: ComponentFixture<AppUserNotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppUserNotificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppUserNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

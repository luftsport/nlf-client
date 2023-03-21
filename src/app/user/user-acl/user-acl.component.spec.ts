import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AppUserAclComponent } from './app-user-acl.component';

describe('AppUserAclComponent', () => {
  let component: AppUserAclComponent;
  let fixture: ComponentFixture<AppUserAclComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AppUserAclComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppUserAclComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppUserOrsComponent } from './app-user-ors.component';

describe('AppUserOrsComponent', () => {
  let component: AppUserOrsComponent;
  let fixture: ComponentFixture<AppUserOrsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppUserOrsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppUserOrsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

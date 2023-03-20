import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AppUserTableComponent } from './app-user-table.component';

describe('AppUserTableComponent', () => {
  let component: AppUserTableComponent;
  let fixture: ComponentFixture<AppUserTableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AppUserTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppUserTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppUserTableComponent } from './app-user-table.component';

describe('AppUserTableComponent', () => {
  let component: AppUserTableComponent;
  let fixture: ComponentFixture<AppUserTableComponent>;

  beforeEach(async(() => {
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

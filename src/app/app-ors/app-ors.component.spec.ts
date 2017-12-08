import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppOrsComponent } from './app-ors.component';

describe('AppOrsComponent', () => {
  let component: AppOrsComponent;
  let fixture: ComponentFixture<AppOrsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppOrsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppOrsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

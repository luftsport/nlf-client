import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfUserFirstLoginComponent } from './user-first-login.component';

describe('NlfUserFirstLoginComponent', () => {
  let component: NlfUserFirstLoginComponent;
  let fixture: ComponentFixture<NlfUserFirstLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfUserFirstLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfUserFirstLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

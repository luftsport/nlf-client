import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfUserProfileComponent } from './user-profile.component';

describe('NlfUserProfileComponent', () => {
  let component: NlfUserProfileComponent;
  let fixture: ComponentFixture<NlfUserProfileComponent>;

  beforeEach(async(() => {
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

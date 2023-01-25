import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NlfUserComponent } from './user.component';

describe('NlfUserComponent', () => {
  let component: NlfUserComponent;
  let fixture: ComponentFixture<NlfUserComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NlfOrsMotorComponent } from './ors-motor.component';

describe('NlfOrsMotorComponent', () => {
  let component: NlfOrsMotorComponent;
  let fixture: ComponentFixture<NlfOrsMotorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsMotorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsMotorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

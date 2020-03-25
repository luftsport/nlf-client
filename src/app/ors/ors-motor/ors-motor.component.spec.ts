import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfOrsMotorComponent } from './ors-motor.component';

describe('NlfOrsMotorComponent', () => {
  let component: NlfOrsMotorComponent;
  let fixture: ComponentFixture<NlfOrsMotorComponent>;

  beforeEach(async(() => {
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

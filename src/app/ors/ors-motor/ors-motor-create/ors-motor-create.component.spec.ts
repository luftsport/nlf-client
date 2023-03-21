import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NlfOrsMotorCreateComponent } from './ors-motor-create.component';

describe('NlfOrsCreateComponent', () => {
  let component: NlfOrsMotorCreateComponent;
  let fixture: ComponentFixture<NlfOrsMotorCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsMotorCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsMotorCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

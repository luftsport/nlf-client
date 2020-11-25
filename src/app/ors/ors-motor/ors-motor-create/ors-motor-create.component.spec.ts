import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfOrsMotorCreateComponent } from './ors-motor-create.component';

describe('NlfOrsCreateComponent', () => {
  let component: NlfOrsMotorCreateComponent;
  let fixture: ComponentFixture<NlfOrsMotorCreateComponent>;

  beforeEach(async(() => {
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

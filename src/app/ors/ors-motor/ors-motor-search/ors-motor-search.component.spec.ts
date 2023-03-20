import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NlfOrsMotorSearchComponent } from './ors-motor-search.component';

describe('NlfOrsMotorSearchComponent', () => {
  let component: NlfOrsMotorSearchComponent;
  let fixture: ComponentFixture<NlfOrsMotorSearchComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsMotorSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsMotorSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfOrsMotorSearchComponent } from './ors-motor-search.component';

describe('NlfOrsMotorSearchComponent', () => {
  let component: NlfOrsMotorSearchComponent;
  let fixture: ComponentFixture<NlfOrsMotorSearchComponent>;

  beforeEach(async(() => {
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

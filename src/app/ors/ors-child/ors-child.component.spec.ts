import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfOrsChildComponent } from './ors-child.component';

describe('NlfOrsChildComponent', () => {
  let component: NlfOrsChildComponent;
  let fixture: ComponentFixture<NlfOrsChildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsChildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

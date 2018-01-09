import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfOrsComponent } from './ors.component';

describe('NlfOrsComponent', () => {
  let component: NlfOrsComponent;
  let fixture: ComponentFixture<NlfOrsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

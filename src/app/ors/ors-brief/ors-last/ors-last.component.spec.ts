import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NlfOrsLastComponent } from './ors-last.component';

describe('NlfOrsLastComponent', () => {
  let component: NlfOrsLastComponent;
  let fixture: ComponentFixture<NlfOrsLastComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsLastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsLastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

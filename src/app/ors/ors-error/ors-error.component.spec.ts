import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NlfOrsErrorComponent } from './ors-error.component';

describe('NlfOrsErrorComponent', () => {
  let component: NlfOrsErrorComponent;
  let fixture: ComponentFixture<NlfOrsErrorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NlfUiComponentSpinnerComponent } from './component-spinner.component';

describe('NlfUiComponentSpinnerComponent', () => {
  let component: NlfUiComponentSpinnerComponent;
  let fixture: ComponentFixture<NlfUiComponentSpinnerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfUiComponentSpinnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfUiComponentSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

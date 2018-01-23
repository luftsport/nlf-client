import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfUiPageSpinnerComponent } from './page-spinner.component';

describe('NlfUiPageSpinnerComponent', () => {
  let component: NlfUiPageSpinnerComponent;
  let fixture: ComponentFixture<NlfUiPageSpinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfUiPageSpinnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfUiPageSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NlfOrsEditorTestclubAlertComponent } from './ors-editor-testclub-alert.component';

describe('NlfOrsEditorAlertComponent', () => {
  let component: NlfOrsEditorTestclubAlertComponent;
  let fixture: ComponentFixture<NlfOrsEditorTestclubAlertComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsEditorTestclubAlertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsEditorTestclubAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

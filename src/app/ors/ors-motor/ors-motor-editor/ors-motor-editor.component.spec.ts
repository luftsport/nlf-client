import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NlfOrsMotorEditorComponent } from './ors-motor-editor.component';

describe('NlfOrsMotorEditorComponent', () => {
  let component: NlfOrsMotorEditorComponent;
  let fixture: ComponentFixture<NlfOrsMotorEditorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsMotorEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsMotorEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

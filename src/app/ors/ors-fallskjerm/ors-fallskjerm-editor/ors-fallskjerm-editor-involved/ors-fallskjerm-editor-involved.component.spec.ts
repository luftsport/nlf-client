import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NlfOrsFallskjermEditorInvolvedComponent } from './ors-fallskjerm-editor-involved.component';

describe('NlfOrsFallskjermEditorInvolvedComponent', () => {
  let component: NlfOrsFallskjermEditorInvolvedComponent;
  let fixture: ComponentFixture<NlfOrsFallskjermEditorInvolvedComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsFallskjermEditorInvolvedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsFallskjermEditorInvolvedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NlfOrsModellflyEditorInvolvedComponent } from './ors-modellfly-editor-involved.component';

describe('NlfOrsModellflyEditorInvolvedComponent', () => {
  let component: NlfOrsModellflyEditorInvolvedComponent;
  let fixture: ComponentFixture<NlfOrsModellflyEditorInvolvedComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsModellflyEditorInvolvedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsModellflyEditorInvolvedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NlfOrsEditorE5XOccurrenceComponent } from './ors-editor-flight-injuries.component';

describe('NlfOrsEditorE5XOccurrenceComponent', () => {
  let component: NlfOrsEditorE5XOccurrenceComponent;
  let fixture: ComponentFixture<NlfOrsEditorE5XOccurrenceComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsEditorE5XOccurrenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsEditorE5XOccurrenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

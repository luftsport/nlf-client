import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NlfOrsEditorTypeComponent } from './ors-editor-type.component';

describe('NlfOrsEditorTypeComponent', () => {
  let component: NlfOrsEditorTypeComponent;
  let fixture: ComponentFixture<NlfOrsEditorTypeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsEditorTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsEditorTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

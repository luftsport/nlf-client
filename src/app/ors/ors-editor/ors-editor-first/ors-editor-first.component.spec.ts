import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfOrsEditorFirstComponent } from './ors-editor-first.component';

describe('NlfOrsEditorFirstComponent', () => {
  let component: NlfOrsEditorFirstComponent;
  let fixture: ComponentFixture<NlfOrsEditorFirstComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsEditorFirstComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsEditorFirstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

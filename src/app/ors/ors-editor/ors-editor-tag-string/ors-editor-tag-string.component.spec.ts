import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NlfOrsEditorTagStringComponent } from './ors-editor-tag-string.component';

describe('NlfOrsEditorTagStringComponent', () => {
  let component: NlfOrsEditorTagStringComponent;
  let fixture: ComponentFixture<NlfOrsEditorTagStringComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsEditorTagStringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsEditorTagStringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

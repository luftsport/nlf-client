import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NlfOrsEditorTagPersonComponent } from './ors-editor-tag-person.component';

describe('NlfOrsEditorTagPersonComponent', () => {
  let component: NlfOrsEditorTagPersonComponent;
  let fixture: ComponentFixture<NlfOrsEditorTagPersonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsEditorTagPersonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsEditorTagPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

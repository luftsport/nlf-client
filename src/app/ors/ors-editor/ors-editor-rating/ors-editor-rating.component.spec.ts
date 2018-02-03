import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfOrsEditorRatingComponent } from './ors-editor-rating.component';

describe('NlfOrsEditorRatingComponent', () => {
  let component: NlfOrsEditorRatingComponent;
  let fixture: ComponentFixture<NlfOrsEditorRatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsEditorRatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsEditorRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

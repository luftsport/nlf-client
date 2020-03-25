import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfOrsEditorE5XRunwayComponent } from './ors-editor-e5x-runway.component';

describe('NlfOrsEditorE5XRunwayComponent', () => {
  let component: NlfOrsEditorE5XRunwayComponent;
  let fixture: ComponentFixture<NlfOrsEditorE5XRunwayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsEditorE5XRunwayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsEditorE5XRunwayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

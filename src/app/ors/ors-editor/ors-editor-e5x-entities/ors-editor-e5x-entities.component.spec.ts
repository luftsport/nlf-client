import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfOrsEditorE5xEntitiesComponent } from './ors-editor-e5x-entities.component';

describe('NlfOrsEditorE5xEntitiesComponent', () => {
  let component: NlfOrsEditorE5xEntitiesComponent;
  let fixture: ComponentFixture<NlfOrsEditorE5xEntitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsEditorE5xEntitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsEditorE5xEntitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

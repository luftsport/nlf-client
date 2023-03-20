import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfOrsEditorE5XWhereMapComponent } from './ors-editor-e5x-where-map.component';

describe('NlfOrsEditorE5XWhereMapComponent', () => {
  let component: NlfOrsEditorE5XWhereMapComponent;
  let fixture: ComponentFixture<NlfOrsEditorE5XWhereMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NlfOrsEditorE5XWhereMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsEditorE5XWhereMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

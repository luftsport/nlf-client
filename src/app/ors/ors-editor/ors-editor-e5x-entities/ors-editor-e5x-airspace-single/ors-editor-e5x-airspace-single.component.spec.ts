import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NlfOrsEditorE5xAirspaceComponent } from './ors-editor-e5x-airspace.component';

describe('NlfOrsEditorE5xAirspaceComponent', () => {
  let component: NlfOrsEditorE5xAirspaceComponent;
  let fixture: ComponentFixture<NlfOrsEditorE5xAirspaceComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsEditorE5xAirspaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsEditorE5xAirspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

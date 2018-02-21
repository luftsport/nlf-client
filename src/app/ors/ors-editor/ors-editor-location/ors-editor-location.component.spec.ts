import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfOrsEditorLocationComponent } from './ors-editor-location.component';

describe('NlfOrsEditorLocationComponent', () => {
  let component: NlfOrsEditorLocationComponent;
  let fixture: ComponentFixture<NlfOrsEditorLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsEditorLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsEditorLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

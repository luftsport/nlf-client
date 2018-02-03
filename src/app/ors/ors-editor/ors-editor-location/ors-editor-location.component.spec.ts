import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrsEditorLocationComponent } from './ors-editor-location.component';

describe('OrsEditorLocationComponent', () => {
  let component: OrsEditorLocationComponent;
  let fixture: ComponentFixture<OrsEditorLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrsEditorLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrsEditorLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfOrsSportsflyEditorComponent } from './ors-sportsfly-editor.component';

describe('NlfOrsSportsflyEditorComponent', () => {
  let component: NlfOrsSportsflyEditorComponent;
  let fixture: ComponentFixture<NlfOrsSportsflyEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsSportsflyEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsSportsflyEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

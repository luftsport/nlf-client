import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfOrsEditorE5XPartinformationComponent } from './ors-editor-e5x-atm.component';

describe('NlfOrsEditorE5XPartinformationComponent', () => {
  let component: NlfOrsEditorE5XPartinformationComponent;
  let fixture: ComponentFixture<NlfOrsEditorE5XPartinformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsEditorE5XPartinformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsEditorE5XPartinformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

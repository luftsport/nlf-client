import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfOrsEditorOperationalComponent } from './ors-editor-operational.component';

describe('NlfOrsEditorOperationalComponent', () => {
  let component: NlfOrsEditorOperationalComponent;
  let fixture: ComponentFixture<NlfOrsEditorOperationalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsEditorOperationalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsEditorOperationalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

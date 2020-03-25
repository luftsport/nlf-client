import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfOrsEditorE5XAtmComponent } from './ors-editor-e5x-atm.component';

describe('NlfOrsEditorE5XAtmComponent', () => {
  let component: NlfOrsEditorE5XAtmComponent;
  let fixture: ComponentFixture<NlfOrsEditorE5XAtmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsEditorE5XAtmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsEditorE5XAtmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfOrsFallskjermEditorComponent } from './ors-fallskjerm-editor.component';

describe('NlfOrsFallskjermEditorComponent', () => {
  let component: NlfOrsFallskjermEditorComponent;
  let fixture: ComponentFixture<NlfOrsFallskjermEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsFallskjermEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsFallskjermEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

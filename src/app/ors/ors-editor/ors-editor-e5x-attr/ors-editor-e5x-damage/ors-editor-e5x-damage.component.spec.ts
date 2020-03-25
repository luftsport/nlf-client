import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfOrsEditorE5XDamageComponent } from './ors-editor-e5x-damage.component';

describe('NlfOrsEditorE5XDamageComponent', () => {
  let component: NlfOrsEditorE5XDamageComponent;
  let fixture: ComponentFixture<NlfOrsEditorE5XDamageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsEditorE5XDamageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsEditorE5XDamageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfOrsEditorTagAirportComponent } from './ors-editor-tag-airport.component';

describe('NlfOrsEditorTagAirportComponent', () => {
  let component: NlfOrsEditorTagAirportComponent;
  let fixture: ComponentFixture<NlfOrsEditorTagAirportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsEditorTagAirportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsEditorTagAirportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

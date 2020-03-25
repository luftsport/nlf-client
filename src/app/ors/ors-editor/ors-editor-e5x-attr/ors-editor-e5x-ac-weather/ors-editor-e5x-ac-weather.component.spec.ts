import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfOrsEditorE5XAcWeatherComponent } from './ors-editor-e5x-ac-weather.component';

describe('NlfOrsEditorE5XAcWeatherComponent', () => {
  let component: NlfOrsEditorE5XAcWeatherComponent;
  let fixture: ComponentFixture<NlfOrsEditorE5XAcWeatherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsEditorE5XAcWeatherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsEditorE5XAcWeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfOrsEditorE5XWeatherComponent } from './ors-editor-e5x-weather.component';

describe('NlfOrsEditorE5XWeatherComponent', () => {
  let component: NlfOrsEditorE5XWeatherComponent;
  let fixture: ComponentFixture<NlfOrsEditorE5XWeatherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsEditorE5XWeatherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsEditorE5XWeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

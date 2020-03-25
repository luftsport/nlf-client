import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfOrsEditorWeatherComponent } from './ors-editor-weather.component';

describe('NlfOrsEditorWeatherComponent', () => {
  let component: NlfOrsEditorWeatherComponent;
  let fixture: ComponentFixture<NlfOrsEditorWeatherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsEditorWeatherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsEditorWeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

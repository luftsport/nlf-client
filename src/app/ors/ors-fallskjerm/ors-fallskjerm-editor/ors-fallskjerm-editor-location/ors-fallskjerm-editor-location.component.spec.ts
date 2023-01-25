import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NlfOrsFallskjermEditorLocationComponent } from './ors-fallskjerm-editor-location.component';

describe('NlfOrsFallskjermEditorLocationComponent', () => {
  let component: NlfOrsFallskjermEditorLocationComponent;
  let fixture: ComponentFixture<NlfOrsFallskjermEditorLocationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsFallskjermEditorLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsFallskjermEditorLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

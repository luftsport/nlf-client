import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NlfOrsEditorE5XAerodromeComponent } from './ors-editor-e5x-aerodrome.component';

describe('NlfOrsEditorE5XAerodromeComponent', () => {
  let component: NlfOrsEditorE5XAerodromeComponent;
  let fixture: ComponentFixture<NlfOrsEditorE5XAerodromeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsEditorE5XAerodromeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsEditorE5XAerodromeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NlfOrsModellflyEditorLocationComponent } from './ors-modellfly-editor-location.component';

describe('NlfOrsModellflyEditorLocationComponent', () => {
  let component: NlfOrsModellflyEditorLocationComponent;
  let fixture: ComponentFixture<NlfOrsModellflyEditorLocationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsModellflyEditorLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsModellflyEditorLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

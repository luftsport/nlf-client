import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrsEditorRouteComponent } from './ors-editor-route.component';

describe('OrsEditorRouteComponent', () => {
  let component: OrsEditorRouteComponent;
  let fixture: ComponentFixture<OrsEditorRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrsEditorRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrsEditorRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

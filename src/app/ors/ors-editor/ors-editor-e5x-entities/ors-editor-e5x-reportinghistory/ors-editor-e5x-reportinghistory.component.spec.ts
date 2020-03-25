import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfOrsEditorE5xReportinghistoryComponent } from './ors-editor-e5x-reportinghistory.component';

describe('NlfOrsEditorE5xReportinghistoryComponent', () => {
  let component: NlfOrsEditorE5xReportinghistoryComponent;
  let fixture: ComponentFixture<NlfOrsEditorE5xReportinghistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsEditorE5xReportinghistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsEditorE5xReportinghistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

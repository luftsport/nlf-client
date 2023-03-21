import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OrsEditorE5xReportinghistoryReportersDescriptionComponent } from './ors-editor-e5x-reportinghistory-reporters-description.component';

describe('NlfOrsEditorE5xReportinghistoryReportersDescriptionComponent', () => {
  let component: NlfOrsEditorE5xReportinghistoryReportersDescriptionComponent;
  let fixture: ComponentFixture<NlfOrsEditorE5xReportinghistoryReportersDescriptionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsEditorE5xReportinghistoryReportersDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsEditorE5xReportinghistoryReportersDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

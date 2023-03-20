import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NlfOrsReportFilesThumbnailsComponent } from './report-files-thumbnails.component';

describe('NlfOrsReportFilesThumbnailsComponent', () => {
  let component: NlfOrsReportFilesThumbnailsComponent;
  let fixture: ComponentFixture<NlfOrsReportFilesThumbnailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsReportFilesThumbnailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsReportFilesThumbnailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

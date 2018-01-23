import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfOrsReportFilesThumbnailsComponent } from './report-files-thumbnails.component';

describe('NlfOrsReportFilesThumbnailsComponent', () => {
  let component: NlfOrsReportFilesThumbnailsComponent;
  let fixture: ComponentFixture<NlfOrsReportFilesThumbnailsComponent>;

  beforeEach(async(() => {
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

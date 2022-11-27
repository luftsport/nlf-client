import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfOrsSeilflyReportComponent } from './ors-seilfly-report.component';

describe('NlfOrsSeilflyReportComponent', () => {
  let component: NlfOrsSeilflyReportComponent;
  let fixture: ComponentFixture<NlfOrsSeilflyReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsSeilflyReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsSeilflyReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

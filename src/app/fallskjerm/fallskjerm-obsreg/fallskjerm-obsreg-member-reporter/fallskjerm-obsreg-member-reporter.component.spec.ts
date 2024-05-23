import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FallskjermObsregMemberReporterComponent } from './fallskjerm-obsreg-member-reporter.component';

describe('FallskjermObsregMemberReporterComponent', () => {
  let component: FallskjermObsregMemberReporterComponent;
  let fixture: ComponentFixture<FallskjermObsregMemberReporterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FallskjermObsregMemberReporterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FallskjermObsregMemberReporterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

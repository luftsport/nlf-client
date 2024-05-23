import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FallskjermObsregMemberReportsComponent } from './fallskjerm-obsreg-member-reports.component';

describe('FallskjermObsregMemberReportsComponent', () => {
  let component: FallskjermObsregMemberReportsComponent;
  let fixture: ComponentFixture<FallskjermObsregMemberReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FallskjermObsregMemberReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FallskjermObsregMemberReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

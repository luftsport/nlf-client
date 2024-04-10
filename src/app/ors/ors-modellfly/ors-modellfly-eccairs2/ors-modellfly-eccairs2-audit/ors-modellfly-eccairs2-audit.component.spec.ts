import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfOrsModellflyEccairs2AuditComponent } from './ors-modellfly-eccairs2-audit.component';

describe('NlfOrsModellflyEccairs2AuditComponent', () => {
  let component: NlfOrsModellflyEccairs2AuditComponent;
  let fixture: ComponentFixture<NlfOrsModellflyEccairs2AuditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NlfOrsModellflyEccairs2AuditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsModellflyEccairs2AuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkersLogsComponent } from './workers-logs.component';

describe('WorkersLogsComponent', () => {
  let component: WorkersLogsComponent;
  let fixture: ComponentFixture<WorkersLogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkersLogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkersLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

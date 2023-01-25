import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WorkerLogComponent } from './worker-log.component';

describe('WorkerLogComponent', () => {
  let component: WorkerLogComponent;
  let fixture: ComponentFixture<WorkerLogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkerLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkerLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

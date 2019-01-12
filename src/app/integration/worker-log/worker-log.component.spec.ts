import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerLogComponent } from './worker-log.component';

describe('WorkerLogComponent', () => {
  let component: WorkerLogComponent;
  let fixture: ComponentFixture<WorkerLogComponent>;

  beforeEach(async(() => {
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

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProcessInfoComponent } from './process-info.component';

describe('ProcessInfoComponent', () => {
  let component: ProcessInfoComponent;
  let fixture: ComponentFixture<ProcessInfoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

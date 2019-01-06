import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfWorkersStatusComponent } from './workers-status.component';

describe('WorkersStatusComponent', () => {
  let component: NlfWorkersStatusComponent;
  let fixture: ComponentFixture<NlfWorkersStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfWorkersStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfWorkersStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

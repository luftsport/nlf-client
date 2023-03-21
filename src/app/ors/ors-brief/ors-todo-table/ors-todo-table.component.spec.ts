import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NlfOrsTodoTableComponent } from './ors-todo-table.component';

describe('NlfOrsTodoTableComponent', () => {
  let component: NlfOrsTodoTableComponent;
  let fixture: ComponentFixture<NlfOrsTodoTableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsTodoTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsTodoTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

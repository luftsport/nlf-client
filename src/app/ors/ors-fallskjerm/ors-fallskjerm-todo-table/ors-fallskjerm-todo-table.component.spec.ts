import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfOrsFallskjermTodoTableComponent } from './ors-fallskjerm-todo-table.component';

describe('NlfOrsFallskjermTodoTableComponent', () => {
  let component: NlfOrsFallskjermTodoTableComponent;
  let fixture: ComponentFixture<NlfOrsFallskjermTodoTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsFallskjermTodoTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsFallskjermTodoTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

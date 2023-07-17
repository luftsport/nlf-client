import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NlfOrsEditorE5XWhereComponent } from './ors-editor-e5x-where.component';

describe('NlfOrsEditorE5XWhereComponent', () => {
  let component: NlfOrsEditorE5XWhereComponent;
  let fixture: ComponentFixture<NlfOrsEditorE5XWhereComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsEditorE5XWhereComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsEditorE5XWhereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

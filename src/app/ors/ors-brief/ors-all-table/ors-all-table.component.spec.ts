import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NlfOrsAllTableComponent } from './ors-fallskjerm-all-table.component';

describe('NlfOrsAllTableComponent', () => {
  let component: NlfOrsAllTableComponent;
  let fixture: ComponentFixture<NlfOrsAllTableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsAllTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsAllTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

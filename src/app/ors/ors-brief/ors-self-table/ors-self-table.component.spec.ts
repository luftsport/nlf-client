import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NlfOrsSelfTableComponent } from './ors-fallskjerm-self-table.component';

describe('NlfOrsSelfTableComponent', () => {
  let component: NlfOrsSelfTableComponent;
  let fixture: ComponentFixture<NlfOrsSelfTableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsSelfTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsSelfTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

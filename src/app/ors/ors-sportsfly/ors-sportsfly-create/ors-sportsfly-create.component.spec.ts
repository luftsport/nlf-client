import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NlfOrsSportsflyCreateComponent } from './ors-sportsfly-create.component';

describe('NlfOrsCreateComponent', () => {
  let component: NlfOrsSportsflyCreateComponent;
  let fixture: ComponentFixture<NlfOrsSportsflyCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsSportsflyCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsSportsflyCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

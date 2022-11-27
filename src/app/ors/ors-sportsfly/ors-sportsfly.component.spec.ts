import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfOrsSportsflyComponent } from './ors-sportsfly.component';

describe('NlfOrsSportsflyComponent', () => {
  let component: NlfOrsSportsflyComponent;
  let fixture: ComponentFixture<NlfOrsSportsflyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsSportsflyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsSportsflyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfOrsGoComponent } from './ors-go.component';

describe('NlfOrsGoComponent', () => {
  let component: NlfOrsGoComponent;
  let fixture: ComponentFixture<NlfOrsGoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsGoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsGoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

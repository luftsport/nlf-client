import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfOrsCreateComponent } from './ors-create.component';

describe('NlfOrsCreateComponent', () => {
  let component: NlfOrsCreateComponent;
  let fixture: ComponentFixture<NlfOrsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

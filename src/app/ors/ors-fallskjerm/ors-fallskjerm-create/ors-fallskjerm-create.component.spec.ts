import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfOrsFallskjermCreateComponent } from './ors-fallskjerm-create.component';

describe('NlfOrsCreateComponent', () => {
  let component: NlfOrsFallskjermCreateComponent;
  let fixture: ComponentFixture<NlfOrsFallskjermCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsFallskjermCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsFallskjermCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

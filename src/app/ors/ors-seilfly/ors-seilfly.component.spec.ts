import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfOrsSeilflyComponent } from './ors-seilfly.component';

describe('NlfOrsSeilflyComponent', () => {
  let component: NlfOrsSeilflyComponent;
  let fixture: ComponentFixture<NlfOrsSeilflyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsSeilflyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsSeilflyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

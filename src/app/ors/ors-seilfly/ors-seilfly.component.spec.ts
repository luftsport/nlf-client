import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NlfOrsSeilflyComponent } from './ors-seilfly.component';

describe('NlfOrsSeilflyComponent', () => {
  let component: NlfOrsSeilflyComponent;
  let fixture: ComponentFixture<NlfOrsSeilflyComponent>;

  beforeEach(waitForAsync(() => {
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

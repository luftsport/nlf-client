import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NlfOrsSeilflyCreateComponent } from './ors-seilfly-create.component';

describe('NlfOrsCreateComponent', () => {
  let component: NlfOrsSeilflyCreateComponent;
  let fixture: ComponentFixture<NlfOrsSeilflyCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsSeilflyCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsSeilflyCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

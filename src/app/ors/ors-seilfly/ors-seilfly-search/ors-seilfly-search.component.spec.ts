import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NlfOrsSeilflySearchComponent } from './ors-seilfly-search.component';

describe('NlfOrsSeilflySearchComponent', () => {
  let component: NlfOrsSeilflySearchComponent;
  let fixture: ComponentFixture<NlfOrsSeilflySearchComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsSeilflySearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsSeilflySearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

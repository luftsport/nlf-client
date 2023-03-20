import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NlfLocationSelectComponent } from './ors-editor-tag-string.component';

describe('NlfLocationSelectComponent', () => {
  let component: NlfLocationSelectComponent;
  let fixture: ComponentFixture<NlfLocationSelectComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfLocationSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfLocationSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NlfOrsEditorE5xWxphenomenaComponent } from './ors-editor-e5x-wxphenomena.component';

describe('NlfOrsEditorE5xWxphenomenaComponent', () => {
  let component: NlfOrsEditorE5xWxphenomenaComponent;
  let fixture: ComponentFixture<NlfOrsEditorE5xWxphenomenaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsEditorE5xWxphenomenaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsEditorE5xWxphenomenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NlfResolveObservationTagsComponent } from './resolve-observation-tags.component';

describe('NlfResolveObservationTagsComponent', () => {
  let component: NlfResolveObservationTagsComponent;
  let fixture: ComponentFixture<NlfResolveObservationTagsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfResolveObservationTagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfResolveObservationTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

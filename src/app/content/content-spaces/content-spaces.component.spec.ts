import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ContentSpacesComponent } from './content-spaces.component';

describe('ContentSpacesComponent', () => {
  let component: ContentSpacesComponent;
  let fixture: ComponentFixture<ContentSpacesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentSpacesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentSpacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

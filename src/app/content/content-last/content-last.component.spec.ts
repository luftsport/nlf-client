import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentLastComponent } from './content-last.component';

describe('ContentLastComponent', () => {
  let component: ContentLastComponent;
  let fixture: ComponentFixture<ContentLastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentLastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentLastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

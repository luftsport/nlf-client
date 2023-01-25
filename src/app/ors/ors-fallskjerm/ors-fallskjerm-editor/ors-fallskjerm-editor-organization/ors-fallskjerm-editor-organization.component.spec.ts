import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NlfOrsFallskjermEditorOrganizationComponent } from './ors-fallskjerm-editor-organization.component';

describe('NlfOrsFallskjermEditorOrganizationComponent', () => {
  let component: NlfNlfOrsFallskjermEditorOrganizationComponent;
  let fixture: ComponentFixture<NlfOrsFallskjermEditorOrganizationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsFallskjermEditorOrganizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsFallskjermEditorOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

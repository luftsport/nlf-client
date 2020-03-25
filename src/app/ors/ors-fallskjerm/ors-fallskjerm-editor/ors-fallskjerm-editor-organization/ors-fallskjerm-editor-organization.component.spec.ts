import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfOrsFallskjermEditorOrganizationComponent } from './ors-fallskjerm-editor-organization.component';

describe('NlfOrsFallskjermEditorOrganizationComponent', () => {
  let component: NlfNlfOrsFallskjermEditorOrganizationComponent;
  let fixture: ComponentFixture<NlfOrsFallskjermEditorOrganizationComponent>;

  beforeEach(async(() => {
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

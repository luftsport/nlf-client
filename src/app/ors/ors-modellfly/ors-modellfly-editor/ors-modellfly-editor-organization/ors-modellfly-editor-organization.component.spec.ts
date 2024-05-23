import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NlfOrsModellflyEditorOrganizationComponent } from './ors-modellfly-editor-organization.component';

describe('NlfOrsModellflyEditorOrganizationComponent', () => {
  let component: NlfNlfOrsModellflyEditorOrganizationComponent;
  let fixture: ComponentFixture<NlfOrsModellflyEditorOrganizationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsModellflyEditorOrganizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsModellflyEditorOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

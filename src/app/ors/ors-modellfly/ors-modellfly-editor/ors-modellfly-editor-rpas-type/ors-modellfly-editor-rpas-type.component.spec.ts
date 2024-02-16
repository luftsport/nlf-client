import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrsModellflyEditorRpasTypeComponent } from './ors-modellfly-editor-rpas-type.component';

describe('OrsModellflyEditorRpasTypeComponent', () => {
  let component: OrsModellflyEditorRpasTypeComponent;
  let fixture: ComponentFixture<OrsModellflyEditorRpasTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrsModellflyEditorRpasTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrsModellflyEditorRpasTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

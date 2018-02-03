import { TestBed, inject } from '@angular/core/testing';

import { NlfOrsEditorService } from './ors.service';

describe('NlfOrsEditorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NlfOrsEditorService]
    });
  });

  it('should be created', inject([NlfOrsEditorService], (service: NlfOrsEditorService) => {
    expect(service).toBeTruthy();
  }));
});

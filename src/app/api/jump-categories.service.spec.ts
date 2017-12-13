import { TestBed, inject } from '@angular/core/testing';

import { JumpCategoriesService } from './jump-categories.service';

describe('JumpCategoriesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JumpCategoriesService]
    });
  });

  it('should be created', inject([JumpCategoriesService], (service: JumpCategoriesService) => {
    expect(service).toBeTruthy();
  }));
});

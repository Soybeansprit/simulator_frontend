import { TestBed } from '@angular/core/testing';

import { GenerateAllModelsService } from './generate-all-models.service';

describe('GenerateAllModelsService', () => {
  let service: GenerateAllModelsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenerateAllModelsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { AllScenesService } from './all-scenes.service';

describe('AllScenesService', () => {
  let service: AllScenesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllScenesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

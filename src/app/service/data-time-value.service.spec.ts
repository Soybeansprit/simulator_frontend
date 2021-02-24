import { TestBed } from '@angular/core/testing';

import { DataTimeValueService } from './data-time-value.service';

describe('DataTimeValueService', () => {
  let service: DataTimeValueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataTimeValueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

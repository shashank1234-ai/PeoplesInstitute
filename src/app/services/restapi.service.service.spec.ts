import { TestBed } from '@angular/core/testing';

import { RestapiServiceService } from './restapi.service.service';

describe('RestapiServiceService', () => {
  let service: RestapiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestapiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

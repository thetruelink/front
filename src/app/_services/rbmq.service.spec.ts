import { TestBed, inject } from '@angular/core/testing';

import { RbmqService } from './rbmq.service';

describe('RbmqService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RbmqService]
    });
  });

  it('should be created', inject([RbmqService], (service: RbmqService) => {
    expect(service).toBeTruthy();
  }));
});

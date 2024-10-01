import { TestBed } from '@angular/core/testing';

import { AplicativoService } from './aplicativo.service';

describe('AplicativoService', () => {
  let service: AplicativoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AplicativoService);
  });

  xit('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { AppoinmentgetService } from './appoinmentget.service';

describe('PractionergetService', () => {
  let service: AppoinmentgetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppoinmentgetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

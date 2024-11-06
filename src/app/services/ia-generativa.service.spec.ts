import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {IaGenerativaService} from './ia-generativa.service';

describe('IaGenerativaService', () => {
  let service: IaGenerativaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [IaGenerativaService]
    });
    service = TestBed.inject(IaGenerativaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import {TestBed} from '@angular/core/testing';

import {AuthService} from './auth.service';
import {Subscription} from 'rxjs';
import {provideHttpClient} from '@angular/common/http';
import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';
import {environment} from '../../environments/environment';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  const subscriptions: Subscription[] = [];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService, provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterAll(() => {
    subscriptions.forEach((s) => s.unsubscribe());
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login the user and return a token', () => {
    const mockResponse = {
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imp1YW5kYWNhbGppQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiYmVkYW1va2EiLCJleHAiOjE3Mjg3MDE4NDV9.8AweMAcU5LCvA7TzPRf5kRJgHCRgrTEEfEC_gg4Ml7c'
    };
    const email = 'test@example.com';
    const password = '123456789';
    subscriptions.push(
      service.login(email, password).subscribe((usuario) => {
        expect(usuario.token).toBe(mockResponse.token);
      })
    );
    const req = httpMock.expectOne(`${environment.apiUrl}/usuario/login`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({email, password});

    req.flush(mockResponse);
  });
});

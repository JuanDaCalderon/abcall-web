import {fakeAsync, TestBed, tick} from '@angular/core/testing';
import {HttpErrorInterceptorService} from './HttpErrorInterceptorService.service';
import {ToastrService} from 'ngx-toastr';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {HttpErrorResponse, HttpHandler, HttpRequest, provideHttpClient} from '@angular/common/http';
import {throwError} from 'rxjs';
import {ToastrModule} from 'ngx-toastr';

describe('Service: HttpErrorInterceptorService', () => {
  let interceptor: HttpErrorInterceptorService;
  let toastControllerSpy: jasmine.SpyObj<ToastrService>;
  beforeEach(() => {
    const toastSpy = jasmine.createSpyObj('ToastrService', ['error']);
    TestBed.configureTestingModule({
      imports: [ToastrModule.forRoot()],
      providers: [
        HttpErrorInterceptorService,
        provideHttpClient(),
        provideHttpClientTesting(),
        {provide: ToastrService, useValue: toastSpy}
      ]
    });
    interceptor = TestBed.inject(HttpErrorInterceptorService);
    toastControllerSpy = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;
  });

  it('should be defined', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should show a toast and rethrow the error when a HttpErrorResponse occurs', fakeAsync(() => {
    const request = new HttpRequest('GET', '/test');
    const next: HttpHandler = {
      handle: jasmine.createSpy('handle').and.returnValue(
        throwError(
          () =>
            new HttpErrorResponse({
              error: {message: 'Error de prueba', statusCode: 500},
              status: 500,
              statusText: 'Internal Server Error'
            })
        )
      )
    };
    interceptor.intercept(request, next).subscribe({
      error: (err) => {
        expect(err.message).toBe('Error de prueba');
        expect(toastControllerSpy.error).toHaveBeenCalled();
        tick();
      }
    });
  }));
});

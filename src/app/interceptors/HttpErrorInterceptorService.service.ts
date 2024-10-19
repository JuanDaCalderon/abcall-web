import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {catchError, Observable, throwError} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptorService implements HttpInterceptor {
  constructor(private toastrService: ToastrService) {}
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMesagge = 'Ocurrió un error inesperado. Por favor, inténtalo de nuevo más tarde.';
        const errorType = 'Error';
        const isCustomError: boolean = !!error.error.message && !!error.error.statusCode;
        if (isCustomError) errorMesagge = error.error?.message;
        this.toastrService.error(errorMesagge.toLowerCase(), errorType.toLowerCase(), {
          closeButton: true,
          progressBar: true
        });
        console.error('CUSTOM ERROR:', errorMesagge);
        return throwError(() => new Error(errorMesagge));
      })
    );
  }
}

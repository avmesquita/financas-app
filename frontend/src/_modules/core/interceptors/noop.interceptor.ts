import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Interceptor Sem Cache
 **/
@Injectable()
export class NoopInterceptor implements HttpInterceptor {

  /**
   * Método principal
   **/
  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {  

    const request = req.clone({
      setHeaders: {
        'Cache-Control': 'private, no-cache, no-store, max-age=0, proxy-revalidate, s-maxage=0, must-revalidate, post-check=0, pre-check=0',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });      
    return next.handle(request);
  }
}
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

/**
 * Interceptor JWT
 */
@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    /**
     * Função principal do Interceptor
     * 
     * @param request 
     * @param next 
     * @returns 
     */
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to api url
        const isApiControle = request.url.startsWith(environment.apiControle || '');
        const isApiConsolidado = request.url.startsWith(environment.apiConsolidado || '');
        if (isApiControle || isApiConsolidado) {
            const token = sessionStorage.getItem('me');
            if (token && token.length > 0) {
                request = request.clone({
                    setHeaders: {
                        Authorization: `Bearer ${sessionStorage.getItem('me')}`
                    }
                });
            }
        }

        return next.handle(request).pipe(
            map(
                (event: HttpEvent<any>) => {
                    return event;
                }
            )
        );
    }
}

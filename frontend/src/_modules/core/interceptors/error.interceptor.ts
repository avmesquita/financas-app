import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

/**
 * Interceptor de Erro
 */
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    /**
     * Constructor
     * 
     * @param router 
     */
    constructor(private router: Router) { }

    /**
     * Função principal 
     * 
     * @param request 
     * @param next 
     * @returns 
     */
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                //this.authenticationService.logout();
                this.router.navigate(["/"])
            }

            const error = err.error || err.statusText;
            return throwError(error);
        }))
    }
}

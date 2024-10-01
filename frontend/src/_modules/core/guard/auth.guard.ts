import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserContextService } from 'src/_modules/core/services/user-context.service';

/**
 * Guard de Autenticação
 */
@Injectable()
export class AuthGuard implements CanActivate {

    /**
     * Constructor
     * 
     * @param router 
     * @param userContextService 
     */
    constructor(private router: Router, private userContextService: UserContextService) { }

    /**
     * Método Principal
     * 
     * @param route 
     * @param state 
     * @returns 
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        var user = this.userContextService.user$.getValue();
        if (user != null) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url and return false
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}

import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map, take } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService,
                private router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot, 
        router: RouterStateSnapshot
        ): 
        boolean 
        | UrlTree
        | Promise<boolean |UrlTree> 
        | Observable<boolean |UrlTree> {
        return this.authService.user.pipe(
            take(1), // take just the first value of user, then unsubscribe, so you don't have an ongoing listener
            map(user => {
            const isAuth = !!user;
            if (isAuth) {
                return true;
            }
            return this.router.createUrlTree(['/auth']);
        }
        ));
        // we need this user to return a boolean. right now it returns a User object.
        // to transform the data, we use pipe(map()) to transform the observable value here.
    }
}
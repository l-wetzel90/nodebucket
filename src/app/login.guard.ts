/*
============================================
; Title:  login.guard.ts
; Author: Richard Krasso
; Modified By: Loren Wetzel
; Date:   18 March 2020
; Description: login guard
;===========================================
*/

import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
  ActivatedRoute
} from "@angular/router";
import { LoginComponent } from "src/app/pages/login/login.component";
import { CookieService } from "ngx-cookie-service";
import { SignInComponent } from "./pages/sign-in/sign-in.component";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class LoginGuard implements CanActivate {
  constructor(private router: Router, private cookieService: CookieService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const sessionUser = this.cookieService.get("session_user");

    if (sessionUser) {
      return true;
    } else {
      this.router.navigate(["login"]);
      return false;
    }
  }
}

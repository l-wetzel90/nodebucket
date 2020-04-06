/*
============================================
; Title:  base-layout.component.ts
; Author: Richard Krasso
; Modified By: Loren Wetzel
; Date:   18 March 2020
; Description: ts file for base-layout component
;===========================================
*/

import { Component, OnInit } from '@angular/core';
import { CookieService } from "ngx-cookie-service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.css']
})
export class BaseLayoutComponent implements OnInit {
  year: number = Date.now();

  constructor(private router: Router, private cookieService: CookieService ) {
  }

  ngOnInit() {
  }

  logout(){
      this.cookieService.delete('session_user','/');
      this.router.navigate(["/session/login"]);
  }

}

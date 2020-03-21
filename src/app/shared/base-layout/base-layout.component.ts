import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { CookieService } from "ngx-cookie-service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.css']
})
export class BaseLayoutComponent implements OnInit {
  year: number = Date.now();
  cookieExists: boolean = this.cookieService.check('session_user');

  constructor(private router: Router, private cookieService: CookieService, private http: HttpClient) {
  }

  ngOnInit() {
  }

  isLoggedIn(){
    if(this.cookieExists){
      return true
    }else{
      return false
    }
  }

  logout(){
    if(this.cookieExists){
      this.cookieService.delete('session_user',"/");
      this.router.navigate([""]);
    }
  }

}

import { Component, OnInit } from "@angular/core";
import { NgForm,FormsModule } from "@angular/forms";
// import { CookieService } from "ngx-cookie-service";
import {Routes, RouterModule} from '@angular/router';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  // empId;

  //sets EMPID to cookie
  onSubmit(form: NgForm) {
    // let empId = form.value.empId;
    // //NEEDS VALIDATION THAT ID IS DB
    // this.cookie.set("eId", empId );

    // //get cookie
    // alert("cookie... num num " + this.cookie.get("eId") +" logged in");
  }

  ngOnInit() {}
}

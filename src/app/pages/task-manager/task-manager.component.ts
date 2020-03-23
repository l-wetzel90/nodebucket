/*
============================================
; Title:  task-manager.component.ts
; Author: Richard Krasso
; Modified By: Loren Wetzel
; Date:   18 March 2020
; Description: ts file for task-manager component
;===========================================
*/

import { Component, OnInit } from "@angular/core";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from "@angular/cdk/drag-drop";
import { Router } from "@angular/router";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: "app-task-manager",
  templateUrl: "./task-manager.component.html",
  styleUrls: ["./task-manager.component.css"]
})
export class TaskManagerComponent implements OnInit {
  constructor(
    private router: Router,
    private http: HttpClient,
    private cookieService: CookieService
  ) {}

  empId = this.cookieService.get("session_user");

  todo: [];
  done: [];
  ngOnInit() {
    this.getTodo();
  }
  // todo = ["Get to work", "Pick up groceries", "Go home", "Fall asleep"];

  // done = ["Get up", "Brush teeth", "Take a shower", "Check e-mail", "Walk dog"];

  getTodo() {
    this.http.get("/api/employees/" + this.empId + "/tasks").subscribe(res => {
      if (res) {
        let jasonTodo = JSON.stringify(eval(res['todo']));
        console.log(jasonTodo);


      }
    }); //end of .subscribe
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}

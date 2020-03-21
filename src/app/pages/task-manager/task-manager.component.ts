import { Component, OnInit } from "@angular/core";
import {CdkDragDrop, moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";
import { Router } from "@angular/router";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { CookieService } from "ngx-cookie-service";

export interface Employee{
  todo:['item'];
  done:['item'];
}

@Component({
  selector: "app-task-manager",
  templateUrl: "./task-manager.component.html",
  styleUrls: ["./task-manager.component.css"]
})
export class TaskManagerComponent implements OnInit {
  constructor(private router: Router,
    private http: HttpClient,
    private cookieService: CookieService) {}

  ngOnInit() {}
  todo = ["Get to work", "Pick up groceries", "Go home", "Fall asleep"];

  done = ["Get up", "Brush teeth", "Take a shower", "Check e-mail", "Walk dog"];
// todo: Employee['todo']
// done: Employee['done']

// getTodo(){
// const empId = this.cookieService.get('session_user');

// this.http.get<Employee['todo']>("/api/employees/"+empId+"/tasks").subscribe(list =>{this.todo = list})

// }

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

/*
============================================
; Title:  task-manager.component.ts
; Author: Loren Wetzel
; Modified By:
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
import { MatDialog } from "@angular/material";
import { TaskCreateDialogComponent } from "src/app/shared/task-create-dialog/task-create-dialog.component";

@Component({
  selector: "app-task-manager",
  templateUrl: "./task-manager.component.html",
  styleUrls: ["./task-manager.component.css"]
})
export class TaskManagerComponent implements OnInit {
  constructor(
    private router: Router,
    private http: HttpClient,
    private cookieService: CookieService,
    private dialog: MatDialog
  ) {}

  //get empId from cookie for api calls
  empId = this.cookieService.get("session_user");

  //variables
  todo: string[] = [];
  done: string[] = [];
  name: string;
  // item: string;

  ngOnInit() {
    this.getLists();
  }

  getLists() {
    this.http.get("/api/employees/" + this.empId + "/tasks").subscribe(res => {
      if (res) {
        this.name= res['firstName']
        this.todo = res["todo"];
        this.done = res["done"];
      } else {
        err => console.log(err);
      } //end of if else
    }); //end of .subscribe
  } //end of getLists

  updateList() {
    this.http
      .put("/api/employees/" + this.empId + "/tasks", {
        todo: this.todo,
        done: this.done
      })
      .subscribe(
        res => {
          if (res) {
            console.log("updated");
            this.todo = res["todo"];
            this.done = res["done"];
          } else {
            err => console.log(err);
          } //end of if/else
        } //end of res
      ); //end of subscribe
  } //end of updateList

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      // this.updateList();
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      // this.updateList();
    }
    //update
    this.updateList();
  } //end of drop

  deleteOne(taskId) {
    this.http
      .delete("/api/employees/" + this.empId + "/tasks/" + taskId)
      .subscribe(
        res => {
          if (res) {
            console.log("deleting" + taskId);
            this.todo = res["todo"];
            this.done = res["done"];
          } else {
            err => console.log(err);
          }
        } //end of res
      ); //end subscribe
  } //end of delete

  openDialog(): void {
    const dialogRef = this.dialog.open(TaskCreateDialogComponent, {
      width: "400px"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
      this.createTask(result);
    });
  }//end of Dialog

  createTask(item) {
    // console.log(item);
    this.http
      .post("/api/employees/" + this.empId + "/tasks", item)
      .subscribe(
        res => {
          if (res) {
            console.log("created");
            //reload component
            this.todo = res["todo"];
            this.done = res["done"];
          } else {
            err => console.log(err);
          } //end if/else
        } //end of res
      ); //end of subscribe
  } //end of create
}

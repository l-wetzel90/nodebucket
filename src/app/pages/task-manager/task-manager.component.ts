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
// import { Router } from "@angular/router";
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
  //variables
  // sessionUser: any;
  tasks: any;
  todo: any;
  done: any;
  inProgress:any;
  name: any;
  empId: any;
  message: any;

  constructor(private http: HttpClient, private cookieService: CookieService, private dialog: MatDialog) {

    //get empId from cookie for api calls
    this.empId = this.cookieService.get("session_user");
    this.message = "";

    // gets and sets lists
    this.http.get("/api/employees/" + this.empId + "/tasks").subscribe(
      res => {
        this.tasks = res;
        this.name = this.tasks.firstName;
        this.todo = this.tasks.todo;
        this.done = this.tasks.done;
        this.inProgress = this.tasks.inProgress;
        if (this.todo === 0) {
          this.message =
            "You don't have any tasks.  Add one below by clicking on the menu";
        } else {
          this.message = "Here are your tasks";
        }
        console.log(this.name+ ' is logged in');
      },
      err => {
        console.log(this.name+ ' is not logged in');
        console.log(err);
      }
    ); //end of .subscribe
  } //end of constructor

  ngOnInit() {}

  /**
   * Create new task dialog
   */
  openDialog() {
    const dialogRef = this.dialog.open(TaskCreateDialogComponent, {
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.http
          .post("/api/employees/" + this.empId + "/tasks", {
            text: data.text
          })
          .subscribe(
            res => {
              this.tasks = res;
              this.todo = this.tasks.todo;
              this.done = this.tasks.done;
              this.inProgress = this.tasks.inProgress;
              console.log("created task");

            }, //end of res
            err => {
              console.log("did not created task");
              console.log(err);
            }
          ); //end of subscribe
      } //end of if
    });
  } //end of Dialog

  /**
   *
   * @param todo
   * @param done
   */
  updateList(todo, done, inProgress) {
    return this.http.put("/api/employees/" + this.empId + "/tasks", {
      todo,
      done,
      inProgress
    });
  }

  /**
   * Drag and drop plus update list
   * @param event
   */
  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      console.log("Moved task in existing column");
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      console.log("Moved tasks to a new column");
    }
    //update
    this.updateList(this.todo, this.done, this.inProgress).subscribe(
      res => {
        this.tasks = res;
        this.todo = this.tasks.todo;
        this.done = this.tasks.done;
        this.inProgress = this.tasks.inProgress;
        console.log("updated tasks");
      },
      err => {
        console.log("Error saving update tasks");
        console.log(err);
      }
    );
  } //end of drop

  /**
   *
   * @param taskId
   */
  deleteOne(taskId) {
    if (taskId) {
      this.http.delete("/api/employees/" + this.empId + "/tasks/" + taskId).subscribe(res => {
            this.tasks = res;
            this.todo = this.tasks.todo;
            this.done = this.tasks.done;
            this.inProgress = this.tasks.inProgress;
            console.log("deleted task");
          }, //end of res
          err => {
            console.log(err);
          }
        ); //end subscribe
    }// end of if
  } //end of delete


} //end of component

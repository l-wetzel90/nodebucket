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
  //variables
  //sessionUser: string
  // todo: string[] = [];
  task:any;
  todo: any;
  done: any;
  name: any;
  empId: any;
  // item: string;

  constructor(private router: Router, private http: HttpClient, private cookieService: CookieService, private dialog: MatDialog) {
    //get empId from cookie for api calls
    // this.sessionUser = this.cookieService.get("session_user");
    this.empId = this.cookieService.get("session_user");

    this.http.get('/api/employees/' + this.empId + '/tasks').subscribe(
      res => {
        this.task = res;
        this.name = this.task.firstName;
        this.todo = this.task.todo;
        this.done = this.task.done;
      },
      err => {
        console.log(err);
      }
    ); //end of .subscribe
  }

  ngOnInit() {}

  /**
  * create new task dialog
  */
  openDialog(): void {
    const dialogRef = this.dialog.open(TaskCreateDialogComponent, {
      width: "400px"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
      this.createTask(result);
    });
  } //end of Dialog

  // updateTasks(todo, done){
  //   return this.http.put('/api/employees/' + this.empId + '/tasks',{todo,done});
  // }
  updateList(todo, done) {
    this.http
      .put("/api/employees/" + this.empId + "/tasks", {
        todo,
        done
      })
      .subscribe(
        res => {
          this.task = res;
            this.todo = this.task.todo;
            this.done = this.task.done;
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
    this.updateList(this.todo,this.done);
  } //end of drop

  deleteOne(taskId) {
    this.http
      .delete("/api/employees/" + this.empId + "/tasks/" + taskId).subscribe(res => {
            console.log("deleting" + taskId);
            this.todo = res["todo"];
            this.done = res["done"];
        },//end of res
            err => {
              console.log(err);
        }
      ); //end subscribe
  } //end of delete

  createTask(item) {
    // console.log(item);
    this.http.post("/api/employees/" + this.empId + "/tasks", item).subscribe(
      res => {
          console.log("created");
          //reload component
          this.todo = res["todo"];
          this.done = res["done"];
        },//end of res
        err => {
          console.log(err);
      }
    ); //end of subscribe
  } //end of create
}//end of component

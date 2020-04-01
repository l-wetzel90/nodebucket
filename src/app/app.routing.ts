/*
============================================
; Title:  app.routing.ts
; Author: Richard Krasso
; Modified By: Loren Wetzel
; Date:   18 March 2020
; Description: router
;===========================================
*/

import { Routes } from "@angular/router";
import { AboutComponent } from "./pages/about/about.component";
import { HomeComponent } from "./pages/home/home.component";
import { NotFoundComponent } from "./pages/not-found/not-found.component";
import { SignInComponent } from "./pages/sign-in/sign-in.component";
import { TaskManagerComponent } from "./pages/task-manager/task-manager.component";
import { AuthLayoutComponent } from "./shared/auth-layout/auth-layout.component";
import { BaseLayoutComponent } from "./shared/base-layout/base-layout.component";
import { AuthGuard } from "./shared/guards/auth.guard";
import { TaskCreateDialogComponent } from "./shared/task-create-dialog/task-create-dialog.component";

export const AppRoutes: Routes = [
  {
    path: "",
    component: BaseLayoutComponent,
    children: [
      {
        path: "",
        canActivate: [AuthGuard],
        component: HomeComponent
      },
      {
        path: "tasks",
        canActivate: [AuthGuard],
        component: TaskManagerComponent
      },
      {
        path: "taskCreate",
        canActivate: [AuthGuard],
        component: TaskCreateDialogComponent
      },
      {
        path: "about",
        canActivate: [AuthGuard],
        component: AboutComponent
      }
    ]
  },
  {
    path: "session",
    component: AuthLayoutComponent,
    children: [
      {
        path: "nope",
        component: NotFoundComponent
      },
      {
        path: "login",
        component: SignInComponent
      },

    ]
  },
  {
    path: "**",
    redirectTo: "session/nope"
  }
];

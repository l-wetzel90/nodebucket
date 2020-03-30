/*
============================================
; Title:  app.module.ts
; Author: Richard Krasso
; Modified By: Loren Wetzel
; Date:   18 March 2020
; Description: app module ts file
;===========================================
*/

import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AppRoutes } from "./app.routing";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CookieService } from "ngx-cookie-service";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { FlexLayoutModule } from "@angular/flex-layout";

import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import {
  MatCardModule,
  MatInputModule,
  MatDividerModule,
  MatDialogModule,
  MatListModule,
  MatMenuModule,
} from "@angular/material";

import { AuthGuard } from "./shared/guards/auth.guard";
import { BaseLayoutComponent } from "./shared/base-layout/base-layout.component";
import { TaskCreateDialogComponent } from './shared/task-create-dialog/task-create-dialog.component';
import { AuthLayoutComponent } from "./shared/auth-layout/auth-layout.component";
import { HomeComponent } from "./pages/home/home.component";
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { SignInComponent } from "./pages/sign-in/sign-in.component";
import { TaskManagerComponent } from "./pages/task-manager/task-manager.component";
import { AboutComponent } from "./pages/about/about.component";

@NgModule({
  declarations: [
    AppComponent,
    BaseLayoutComponent,
    AuthLayoutComponent,
    HomeComponent,
    AboutComponent,
    SignInComponent,
    TaskManagerComponent,
    NotFoundComponent,
    TaskCreateDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(AppRoutes, {
      useHash: true,
      enableTracing: false,
      scrollPositionRestoration: "enabled"
    }),
    FlexLayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    DragDropModule,
    MatSnackBarModule,
    MatDividerModule,
    MatDialogModule,
    MatListModule,
    MatMenuModule
  ],
  entryComponents:[TaskCreateDialogComponent],
  providers: [CookieService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}

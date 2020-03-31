/*
============================================
; Title:  app.module.ts
; Author: Richard Krasso
; Modified By: Loren Wetzel
; Date:   18 March 2020
; Description: app module ts file
;===========================================
*/

import { DragDropModule } from "@angular/cdk/drag-drop";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatCardModule, MatDialogModule, MatDividerModule, MatInputModule, MatListModule, MatMenuModule } from "@angular/material";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatToolbarModule } from "@angular/material/toolbar";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { CookieService } from "ngx-cookie-service";

import { AppComponent } from "./app.component";
import { AppRoutes } from "./app.routing";
import { AboutComponent } from "./pages/about/about.component";
import { HomeComponent } from "./pages/home/home.component";
import { NotFoundComponent } from "./pages/not-found/not-found.component";
import { SignInComponent } from "./pages/sign-in/sign-in.component";
import { TaskManagerComponent } from "./pages/task-manager/task-manager.component";
import { AuthLayoutComponent } from "./shared/auth-layout/auth-layout.component";
import { BaseLayoutComponent } from "./shared/base-layout/base-layout.component";
import { AuthGuard } from "./shared/guards/auth.guard";
import { TaskCreateDialogComponent } from "./shared/task-create-dialog/task-create-dialog.component";

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
  entryComponents: [TaskCreateDialogComponent],
  providers: [CookieService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}

import { Routes } from "@angular/router";
import { BaseLayoutComponent } from "./shared/base-layout/base-layout.component";
import { HomeComponent } from "./pages/home/home.component";
import { AboutComponent } from "./pages/about/about.component";
import { SignInComponent } from "./pages/sign-in/sign-in.component";
import { TaskManagerComponent } from './pages/task-manager/task-manager.component';
import { AuthGuard } from './auth.guard';

export const AppRoutes: Routes = [
  {
    path: "",
    component: BaseLayoutComponent,
    children: [
      {
        path: "",
        component: HomeComponent
      },
      {
        path: "login",
        component: SignInComponent
      },
      {
        path: "about", canActivate:[AuthGuard],
        component: AboutComponent
      },
      {
        path: "tasks", canActivate:[AuthGuard],
        component: TaskManagerComponent
      }
      /*
        New components go here...
       */
    ]
  }
];

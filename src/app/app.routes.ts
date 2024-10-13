import { Routes } from "@angular/router";
import { AuthGuard } from "./auth.guard";
import { LoginComponent } from "./components/login/login.component";
import { TasksComponent } from "./components/tasks/tasks.component";
import { AddTaskComponent } from "./components/add-task/add-task.component";
import { TaskItemComponent } from "./components/task-item/task-item.component";

export const routes: Routes = [
    { path: "login", component: LoginComponent },
    {
        path: "tasks",
        component: TasksComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "tasks/new",
        component: AddTaskComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "tasks/:id/edit",
        component: TaskItemComponent,
        canActivate: [AuthGuard]
    },
    { path: "", redirectTo: "/login", pathMatch: "full" },
    { path: "**", redirectTo: "/login" }
];
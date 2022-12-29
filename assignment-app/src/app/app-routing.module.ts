import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AssignmentsComponent} from "./assignments/assignments.component"
import {AddAssignementComponent} from  "./assignments/add-assignement/add-assignement.component"
import {ComponentDetailComponent} from  "./assignments/component-detail/component-detail.component"
import {EditAssignmentComponent} from "./assignments/edit-assignment/edit-assignment.component";
import {AuthGuard} from "./shared/auth.guard";
import {LoginComponent} from "./assignments/login/login.component";
const routes: Routes = [
  {
    path :"home",component:AssignmentsComponent
  },
  {
    path:"detail",component:ComponentDetailComponent
  },
  {
    path:"add",component:AddAssignementComponent
  },
  {
    path:'assignement/:id',component:ComponentDetailComponent
  },
  {
    path:"login",component:LoginComponent
  },
  {
    path:'assignement/:id/edit',
    component:EditAssignmentComponent,
    canActivate:[AuthGuard]
  }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

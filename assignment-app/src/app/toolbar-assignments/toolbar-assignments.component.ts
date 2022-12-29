import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../shared/auth.service";
import {AssignmentsService} from "../shared/assignments.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-toolbar-assignments',
  templateUrl: './toolbar-assignments.component.html',
  styleUrls: ['./toolbar-assignments.component.css']
})
export class ToolbarAssignmentsComponent implements OnInit {
opened=false;
@Input()
isLoggin: boolean = false;
  constructor(
    private auth:AuthService,
    private assignementservice :AssignmentsService,
    private  route:Router
  ) {
  }
  ngOnChanges(){

  }

  ngOnInit(): void {
    this.isLoggin = this.auth.loggedIn;
    console.log(this.isLoggin)

  }
//  log=this.auth.loggedIn;
  logout(){
  this.isLoggin = !this.auth.loggedIn;
  }
  getauth(){
     return this.auth;
  }
  initialser(){
this.assignementservice.peuplerbd2ForkJoin().subscribe(()=>{
  console.log('#### donnes ajouter ###')
  //et on va afficher la liste de assignement
  this.route.navigate(["home"],{replaceUrl:true});

})
  }


}

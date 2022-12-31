import { Component, OnInit } from '@angular/core';
import {AssignmentsService} from "../../shared/assignments.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../shared/auth.service";
import {User} from "./user.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email:string
  password:string
  userT?:User;
  constructor(private service:AssignmentsService,
              private route:ActivatedRoute,
              private router:Router,
              private auth:AuthService
  ) { }
  ngOnInit(): void {
  }
  onverif(){
    this.auth.findUser(this.email,this.password).subscribe((user)=>{
      this.auth.user =user;
      console.log("this.user",this.userT);
      if (this.userT===null){
        alert("User not Defined")
      }
      else {
        this.auth.logIn();
        this.router.navigate(['home']);
      }

    })
  /*
    if (this.auth.isUser(this.email,this.password))
    {
       this.auth.logIn();
       this.router.navigate(['/home']);
    }
    */

  }

}

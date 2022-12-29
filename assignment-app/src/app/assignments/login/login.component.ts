import { Component, OnInit } from '@angular/core';
import {AssignmentsService} from "../../shared/assignments.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../shared/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email:string
  password:string
  constructor(private service:AssignmentsService,
              private route:ActivatedRoute,
              private router:Router,
              private auth:AuthService
  ) { }
  ngOnInit(): void {

  }
  onverif(){
    if ((this.email=="admin")&&(this.password=="admin"))
    {
       this.auth.logIn();
       this.router.navigate(['/home']);
    }
  }


}

import { Injectable } from '@angular/core';
import {catchError, Observable, of, tap} from "rxjs";
import {assignment} from "../assignments/assignments.model";
import {User} from "../assignments/login/user.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn=false;
  admin=false;
  url="https://angular-back.onrender.com/api/users";
  user:User;
  private HttpOptions = {
    headers: new HttpHeaders({
      'content-type' : 'application/json'
    })
  }


ngOnInit():void{
}
constructor(private http:HttpClient) {}
  logIn(){
    this.loggedIn=true;
    if (this.user.isadmin){
      this.admin=true;
    }
    console.log("admin service",this.admin);
    console.log("login service",this.loggedIn);
  }
  logout(){
    this.loggedIn=false;
    if (this.user.isadmin){
      this.admin=false;
    }
    console.log(this.admin);
    console.log(this.loggedIn);
  }

  isAdmin(){
    const isUserAdmin = new Promise(
      (resolve,reject)=>{
        resolve(this.loggedIn)
      }
    );
    return isUserAdmin;
  }
  findUser(email,password):Observable<User|undefined>{
      return this.http.post<User>(this.url,{email,password},this.HttpOptions) ;
  }


  isUser(email:string,password:string):boolean{
  if (this.findUser(email,password)!==undefined){
  this.findUser(email,password).subscribe((user) =>{
    this.user = user;
    console.log(user);
  })
    return true;
  }
  return false;
  }

  private handleError<T>(operation:any,result?:T)
  {
    return(error:any):Observable<T>=>{
      console.log(error);
      console.log(operation+'a echoué' +error.message);
      return of(result as T);
    }
  }
  isAdmin2(){
    const isUserAdmin = new Promise(
      (resolve,reject)=>{
        resolve(this.admin)
      }
    );
    return isUserAdmin;
  }


}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn=false ;
  logIn(){
    this.loggedIn=true;
    console.log(this.loggedIn);
  }
  logout(){
    this.loggedIn=false;
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

}

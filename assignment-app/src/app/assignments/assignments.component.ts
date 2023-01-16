import {Component, OnInit, ViewChild,AfterViewInit} from '@angular/core';
import { assignment } from './assignments.model';
import {AssignmentsService} from '../shared/assignments.service';
import {Observable, of} from "rxjs";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {AuthService} from "../shared/auth.service";


@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit ,AfterViewInit {
 titre ="mon application sur les assingment !";

 formVisible = false;
 //form
 nomDevoir="";
 dateDeRendu!:Date;
 assignmentSelection!:assignment;
  assignmentSelection2!:assignment;
  assignemets!:assignment[];
  //Pour la pagination
  page:number=1;
  limit:number=10;
  totalDocs:number=0;
  totalPages:number=0;
  hasPrevPage:boolean=false;
  prevPage:number=0;
  hasNextPage:boolean=false;
  nextPage:number=0;
  //pour l'affichage en table
  displayedColumns: string[] = ['demo-id', 'demo-nom','demo-auteur','demo-prof','demo-matiere','demo-photomat','demo-dateDeRendu', 'demo-rendu','demo-notematiere','demo-remarque'];
  dataSource= new MatTableDataSource(this.assignemets);

 constructor (private assignementService:AssignmentsService,private authService:AuthService) { }

  ngOnInit(): void {
    //this.assignemets=this.assignementService.getAssignments();
    this.getAssignements();
  }
  getAssignements(){
   this.assignementService.getAssignmentsPagine(this.page,this.limit).subscribe((data)=>{
     this.assignemets=data.docs;
     this.page = data.page;
     this.limit = data.limit;
     this.totalDocs = data.totalDocs;
     this.totalPages = data.totalPages;
     this.hasPrevPage = data.hasPrevPage;
     this.prevPage = data.prevPage;
     this.hasNextPage = data.hasNextPage;
     this.nextPage = data.nextPage;
     console.log("this.assignments",this.assignemets);
   }); // renvoi un observable
}

  assignmentClique(assignemet:assignment)
{
this.assignmentSelection=assignemet;
}

@ViewChild(MatSort) sort:MatSort;
 ngAfterViewInit(){
   this.dataSource.data;

 }
onAddAssignmentbtnClick(){
  this.formVisible=true;
}
/*
onNouvelAssignment(event:assignment){
   this.assignementService.AddAssignenements(event).subscribe(message=>console.log(message));
  this.formVisible=false;// on veut voir la liste
}
*/

  OnsuppAssignment(event:assignment){
      this.assignmentSelection=this.assignmentSelection2;

  }
  pagePremiere(){
  this.page=1;
    this.getAssignements();
  }
  pagePrecdent(){
    if (this.hasPrevPage){
      this.page=this.prevPage;
      this.getAssignements();
    }
  }
  pageSuivant(){
    if (this.hasNextPage){
      this.page=this.nextPage;
      this.getAssignements();
    }
  }
  pageDerniere(){
    this.page=this.totalPages;
    this.getAssignements();
  }
 isLoggedIn()
 {
   return this.authService.loggedIn;
 }
}

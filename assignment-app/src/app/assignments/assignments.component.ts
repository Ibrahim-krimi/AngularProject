import { Component, OnInit } from '@angular/core';
import { assignment } from './assignments.model';
import {AssignmentsService} from '../shared/assignments.service';
import {Observable, of} from "rxjs";


@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {
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

 constructor (private assignementService:AssignmentsService) { }

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
}

import { Component, OnInit } from '@angular/core';
import {AssignmentsService} from "../../shared/assignments.service";
import {ActivatedRoute, Router} from "@angular/router";
import {assignment} from "../assignments.model";

@Component({
  selector: 'app-edit-assignment',
  templateUrl: './edit-assignment.component.html',
  styleUrls: ['./edit-assignment.component.css']
})
export class EditAssignmentComponent implements OnInit {
  assignemnt!:assignment|undefined;
  nomDevoir="";
  dateDeRendu!:Date;
  constructor(private service:AssignmentsService,
              private route:ActivatedRoute,
              private router:Router
  ) { }

  ngOnInit(): void {
    this.getAssignement();

  }

getAssignement(){
    const  id =+this.route.snapshot.params['id'];
    this.service.getAssignment(id).subscribe((assignment)=>
      {
        if (!assignment) return;
        this.assignemnt=assignment;
        //Pour pre-remplir le formylaire
        this.nomDevoir=assignment.nom;
        this.dateDeRendu=assignment.dateDeRendu;
      }
    );
}
OnSaveAssignment(){
    if (!this.assignemnt) return;
    //on recupere  les valeur de forumalaire
    this.assignemnt.nom=this.nomDevoir;
    this.assignemnt.dateDeRendu=this.dateDeRendu;
    this.service.updateAssignenements(this.assignemnt).subscribe(
      (reponse)=> {
        console.log(reponse.message);
        this.router.navigate(['/home']);
      }
)
}

}

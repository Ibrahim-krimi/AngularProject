import { Component/*, EventEmitter,Output*/,OnInit } from '@angular/core';
import { assignment } from '../assignments.model';
import {AssignmentsService} from'../../shared/assignments.service';
import {ActivatedRoute,provideRouter, Router} from "@angular/router";
import {Matiere} from "../Matiere.model";
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-add-assignement',
  templateUrl: './add-assignement.component.html',
  styleUrls: ['./add-assignement.component.css']
})
export class AddAssignementComponent implements OnInit {
 //@Output () nouvelAssignment = new EventEmitter  <assignment>();
  nomDevoir="";
  dateDeRendu!:Date;
  auteur!:string;
  notematiere=0;
  matiers:Matiere[];
  valeurselectionneID:number;
  remarque = "";
  matiere="";
  photomatiere="";
  photoprof="";


  constructor(private service:AssignmentsService,
              private route:ActivatedRoute,
              private router:Router
  ) { }

  ngOnInit(): void {
    this.service.getmatieres().subscribe((a)=>{
      this.matiers=a;

    })
  }

  onSubmit() {
    if ((this.nomDevoir != "")|| (this.dateDeRendu != null)) {
      const newassignement = new assignment;
      newassignement.id=this.service.getNewId();
      newassignement.nom = this.nomDevoir;
      newassignement.rendu = false;
      newassignement.dateDeRendu = this.dateDeRendu;
      newassignement.auteur=this.auteur;
      newassignement.nommatiere=this.matiere
      newassignement.photoprof=this.photoprof;
      newassignement.photomatiere=this.photomatiere;
      newassignement.remarque=this.remarque;
      newassignement.notematiere=this.notematiere;
      console.log(newassignement);
      this.service.AddAssignenements(newassignement).subscribe(
        reponse =>
        {
          console.log(newassignement);
          console.log(reponse.message);
          this.router.navigate(['/home']);

        }

    );


      //this.nouvelAssignment.emit(newa ssignement);
      //this.assignemets.push(newassignement);
    }
    else {
     alert("les champs son vide");
    }
  }
  subjectSelected() {
    this.service.getmateireById(this.valeurselectionneID).subscribe((matiere) => {
      this.matiere = matiere.nom;
      this.photomatiere = matiere.photomatiere;
      this.photoprof = matiere.photoprof;
    })
  }
  onOptionSelected(event:MatSelectChange) {
    this.valeurselectionneID = event.value;
    this.subjectSelected();
  }
}

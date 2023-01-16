import { Component, OnInit } from '@angular/core';
import {AssignmentsService} from "../../shared/assignments.service";
import {ActivatedRoute, Router} from "@angular/router";
import {assignment} from "../assignments.model";
import {MatSelectChange} from "@angular/material/select";
import {Matiere} from "../Matiere.model";

@Component({
  selector: 'app-edit-assignment',
  templateUrl: './edit-assignment.component.html',
  styleUrls: ['./edit-assignment.component.css']
})
export class EditAssignmentComponent implements OnInit {
  assignemnt!: assignment | undefined;
  nomDevoir = "";
  dateDeRendu!: Date;
  auteur = ""
  matiere = ""
  photoprof = ""
  photomatiere = ""
  remarque = ""
  matiers: Matiere[];
  valeurselectionneID: number;
  notematiere!: number;
  matiereid: number;

  constructor(private service: AssignmentsService,
              private route: ActivatedRoute,
              private router: Router
  ) {
  }

  ngOnInit(): void {
    this.getAssignement();
    this.service.getmatieres().subscribe((m) => {
      this.matiers = m;

    })

  }

  getAssignement() {
    const id = +this.route.snapshot.params['id'];
    this.service.getAssignment(id).subscribe((assignment) => {
        if (!assignment) return;
        this.assignemnt = assignment;
        //Pour pre-remplir le formylaire
        this.nomDevoir = assignment.nom;
        this.auteur = assignment.auteur;
        this.matiere = assignment.nommatiere;
        this.notematiere = assignment.notematiere;
        this.dateDeRendu = assignment.dateDeRendu;
        this.remarque = assignment.remarque;
        this.photomatiere = assignment.photomatiere;
        this.photoprof = assignment.photoprof;
        this.getmatiere(assignment.nommatiere);


      }
    );
  }

  OnSaveAssignment() {
    if (!this.assignemnt) return;
    //on recupere  les valeur de forumalaire
    this.assignemnt.nom = this.nomDevoir;
    this.assignemnt.auteur = this.auteur;
    this.assignemnt.dateDeRendu = this.dateDeRendu;
    this.assignemnt.nommatiere = this.matiere;
    this.assignemnt.notematiere = this.notematiere;
    this.assignemnt.remarque = this.remarque;
    this.assignemnt.photomatiere = this.photomatiere;
    this.assignemnt.photoprof = this.photoprof;
    this.service.updateAssignenements(this.assignemnt).subscribe(
      (reponse) => {
        console.log(reponse.message);
        this.router.navigate(['/home']);
      }
    )
  }

  subjectSelected() {
    this.service.getmateireById(this.valeurselectionneID).subscribe((matiere) => {
      this.matiere = matiere.nom;
      this.photomatiere = matiere.photomatiere;
      this.photoprof = matiere.photoprof;
    })
  }

  onOptionSelected(event: MatSelectChange) {
    this.valeurselectionneID = event.value;
    this.subjectSelected();
  }

  onValueChange() {
    if (this.notematiere < 0 || this.notematiere > 20) {
      alert("la note doit etre entre 0 et 20");
    }

  }

  getmatiere(name: string) {
    this.matiers.map((s) => {
      if (s.nom == name) {
        this.matiereid = s.id;
        this.photoprof = s.photoprof;
        this.photomatiere = s.photomatiere;
        console.log(this.matiereid);
        console.log(this.photoprof);
        console.log(this.photomatiere);
      }
    })
  }
}

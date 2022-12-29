import { Component/*, EventEmitter,Output*/,OnInit } from '@angular/core';
import { assignment } from '../assignments.model';
import {AssignmentsService} from'../../shared/assignments.service';
import {ActivatedRoute,provideRouter, Router} from "@angular/router";

@Component({
  selector: 'app-add-assignement',
  templateUrl: './add-assignement.component.html',
  styleUrls: ['./add-assignement.component.css']
})
export class AddAssignementComponent implements OnInit {
 //@Output () nouvelAssignment = new EventEmitter  <assignment>();
  nomDevoir="";
  dateDeRendu!:Date;
  constructor(private service:AssignmentsService,
              private route:ActivatedRoute,
              private router:Router
  ) { }

  ngOnInit(): void {

  }

  onSubmit() {
    if ((this.nomDevoir != "")|| (this.dateDeRendu != null)) {
      const newassignement = new assignment;
      newassignement.id=this.service.getNewId();
      newassignement.nom = this.nomDevoir;
      newassignement.rendu = false;
      newassignement.dateDeRendu = this.dateDeRendu;
      this.service.AddAssignenements(newassignement).subscribe(
        reponse =>
        {
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
}

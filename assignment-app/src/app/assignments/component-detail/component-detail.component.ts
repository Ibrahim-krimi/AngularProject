import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { assignment } from '../assignments.model';
import {AssignmentsService} from '../../shared/assignments.service';
import {Router,ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-component-detail',
  templateUrl: './component-detail.component.html',
  styleUrls: ['./component-detail.component.css']
})
export class ComponentDetailComponent implements OnInit {
 //@Input()
  assignementTransmis!:assignment;
 @Output() suppAssignment = new EventEmitter <assignment>();
  constructor(private assignementsservice:AssignmentsService,
              private route:ActivatedRoute,
              private router:Router

  ) { }

  ngOnInit(): void {
    // on ecupere l id passer en parametre dans l url via l objet snapshot
    const id = +this.route.snapshot.params['id'];
    this.assignementsservice.getAssignment(id).
    subscribe(a => this.assignementTransmis=a);

  }

  getAssignement(){
    //on recupere l id  dans la snapchot passe par routeur
    //le + force la conversion de l id  de type string en type "number"
    const id=+this.route.snapshot.params['id'];
    this.assignementsservice.getAssignment(id).subscribe(
      assignment=> this.assignementTransmis=assignment
    );
    console.log(this.assignementTransmis);

}
 // assignement!: assignment;

  onAssignementRendu(){
    this.assignementTransmis.rendu=true;
    this.assignementsservice.updateAssignenements(this.assignementTransmis).subscribe(message=>console.log(message));
    this.router.navigate(['/home']);
  }
  OnSupp(assignement: assignment)  {
    this.suppAssignment.emit(assignement);
    this.assignementsservice.deleteAssignements(assignement).subscribe(reponse => {
      console.log(reponse);
      this.router.navigate(['/home']);
    }
  );
    //this.assignementTransmis=null;
  }
  onClickEdit(){
    this.router.navigate(["/assignement",this.assignementTransmis.id,'edit'],
      {queryParams:{nom:this.assignementTransmis.nom},fragment:'edition'});
  }
}

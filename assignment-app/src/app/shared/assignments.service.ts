import { Injectable } from '@angular/core';
import {assignment} from "../assignments/assignments.model";
import {catchError, forkJoin, map, Observable, of, tap} from "rxjs";
import {LoggingService} from"./logging.service"
import {HttpClient} from "@angular/common/http";
import {coerceStringArray} from "@angular/cdk/coercion";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {bdInitialAssignments} from "./data";
import {bdInitialMatieres} from "./datamatiere";
import {Matiere} from "../assignments/Matiere.model";

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {

   // id=3;
  assignemets:any
  subjectList :Matiere[];

  ngOnInit(): void {
  }
  url="https://angular-back.onrender.com/api/assignments";
  constructor( public logging:LoggingService , private http:HttpClient) { }
  getAssignments():Observable<assignment[]>{ // observale facilite les chose
    return this.http.get<assignment[]>(this.url);
   //return of(this.assignemets); // transforme le tableau en observable
  }
  getAssignmentsPagine(page:number,limit:number):Observable<any>{
    return this.http.get<any>(this.url+"?page="+page+"&limit="+limit);
  }

  getNewId():number{
    return Math.floor(Math.random()*10000);
  }
  AddAssignenements(assignement:assignment):Observable<any>{
    //this.id++;
   // assignement.id=this.id;
    //this.assignemets.push(assignement); // la jout d une assignement a traver l obervable c est plus facile a manupiler
    //this.logging.log(assignement.nom,"Ajouter");
    //console.log(this.assignemets);
    //return of('Assignement ajouter'); // message d ajout
    this.logging.log(assignement.nom,"Ajouter");
    return this.http.post<assignment>(this.url,assignement );
  }
  updateAssignenements(assignement:assignment):Observable<any>{
    //ici une requete PUT a une base de donnees
    return this.http.put<assignment>(this.url,assignement );

  }
  deleteAssignements(assignement:assignment):Observable<any>{
    //let pos =this.assignemets.indexOf(assignement);
    //this.assignemets.splice(pos,1);
    this.logging.log(assignement.nom,"Supprimer");
    //return of("Assignement service: assignement supprimer") ;
    let deleteurl= this.url+'/'+assignement._id;
    return this.http.delete(deleteurl);
  }

  getAssignment(id:number):Observable<assignment|undefined>{
    console.log(this.http.get<assignment>(this.url+"/"+id));
  return  this.http.get<assignment>(this.url+"/"+id).pipe(
    tap(a=> {
    console.log(a.nom);
      }),
    catchError(this.handleError<any>('catch error by id ='+id))
  );
  }
  private handleError<T>(operation:any,result?:T)
  {
      return(error:any):Observable<T>=>{
        console.log(error);
        console.log(operation+'a echoué' +error.message);
        return of(result as T);
      }
  }
  peuplerbd(){
    bdInitialAssignments.forEach(a=>{
      let nouvAssignement = new assignment();
      nouvAssignement.nom=a.nom;
      nouvAssignement.id=a.id;
      nouvAssignement.dateDeRendu=new Date(a.dateDeRendu);
      nouvAssignement.rendu=a.rendu;
      nouvAssignement.remarque=a.remarque;
      nouvAssignement.auteur=a.auteur;
      nouvAssignement.notematiere=a.notematiere;


      this.AddAssignenements(nouvAssignement).subscribe(
        reponse=> console.log(reponse.message)
      );
      console.log("###Tous les Assingnement sont ajouter !!!")

    })
  }
  //deuxeme methode avec la ForkJoin
  peuplerbd2ForkJoin():Observable<any>{
    const appelVersAddAssignement:any=[];
    bdInitialAssignments.forEach((a)=> {
      let nouvAssignement = new assignment();
      nouvAssignement.nom = a.nom;
      nouvAssignement.id = a.id;
      nouvAssignement.dateDeRendu = new Date(a.dateDeRendu);
      nouvAssignement.rendu = a.rendu;
      nouvAssignement.auteur=a.auteur;
      nouvAssignement.remarque=a.remarque;
      nouvAssignement.notematiere=a.notematiere;
      const randomElement =this.getRandomElement(bdInitialMatieres);
      nouvAssignement.nommatiere=randomElement.nom;
      nouvAssignement.photoprof=randomElement.photoprof;
      nouvAssignement.photomatiere=randomElement.photomatiere;

      appelVersAddAssignement.push(this.AddAssignenements(nouvAssignement))

    } );

      console.log("###Tous les Assingnement sont ajouter !!!")
    return forkJoin(appelVersAddAssignement);

  }
  getmatieres():Observable<Matiere[]>{
    this.subjectList=bdInitialMatieres;
return of(bdInitialMatieres);
  }
  getmateireById(id:number):Observable<Matiere|undefined>{
      return of(this.subjectList.find(a=>a.id === id));
  }
  getmatiereByName(name:string):Observable<Matiere|undefined>{
    return of(this.subjectList.find((a)=>{a.nom == name}));
  }
   getRandomElement(array: any[]): any {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }

}
